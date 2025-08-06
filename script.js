const colorLabels = {
  en: ["purple", "red", "grey", "orange", "green", "yellow", "blue"],
  es: ["morado", "rojo", "gris", "naranja", "verde", "amarillo", "azul"],
  fr: ["violet", "rouge", "gris", "orange", "vert", "jaune", "bleu"],
  jp: ["murasaki", "aka", "haiiro", "orenji", "midori", "kiiro", "ao"]
};

const colors = [
  { name: "purple", color: "#800080" },
  { name: "red", color: "#ff0000" },
  { name: "gray", color: "#808080" },
  { name: "orange", color: "#ffa500" },
  { name: "green", color: "#008000" },
  { name: "yellow", color: "#ffff00" },
  { name: "blue", color: "#0000ff" }
];

const flagUrls = {
  en: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  es: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
  fr: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
  jp: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
};

let currentLang = "";
let allButtons = [];

function openLanguage(lang) {
  currentLang = lang;
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("color-screen").style.display = "block";

  // Nastavení pozadí vlajky
  const flag = document.getElementById("flag-background");
  flag.style.backgroundImage = `url(${flagUrls[lang]})`;

  const nameMap = {
    en: "Angličtina",
    es: "Španělština",
    fr: "Francouzština",
    jp: "Japonština"
  };
  document.getElementById("language-name").innerText = nameMap[lang];

  const container = document.getElementById("color-buttons");
  container.innerHTML = "";
  allButtons = [];

  colors.forEach((color, index) => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color.color;

    const text = document.createElement("span");
    text.className = "label";
    text.textContent = colorLabels[lang][index];
    btn.appendChild(text);

    btn.addEventListener("click", function () {
      if (btn.disabled) return;
      allButtons.forEach(b => b.disabled = true);

      const audio = new Audio(`sounds/${lang}_${color.name}.mp3`);
      audio.play().catch(() => console.log(`Chybějící zvuk: ${lang}_${color.name}`));
      btn.style.opacity = "0.6";

      btn.removeChild(text);

      const label = document.createElement("span");
      label.textContent = "Přehrává se";
      label.className = "label";
      btn.appendChild(label);

      audio.addEventListener("ended", () => {
        setTimeout(() => {
          allButtons.forEach(b => b.disabled = false);
          btn.style.opacity = "1";
          btn.removeChild(label);
          btn.appendChild(text);
        }, 500);
      });
    });

    container.appendChild(btn);
    allButtons.push(btn);
  });

  // Tlačítko Zpět
  const backBtn = document.createElement("button");
  backBtn.textContent = "Zpět";
  backBtn.className = "back-button";

  backBtn.addEventListener("click", () => {
    if (backBtn.disabled) return;
    backBtn.disabled = true;
    backBtn.style.opacity = "0.6";

    setTimeout(() => {
      goBack();
      backBtn.disabled = false;
      backBtn.style.opacity = "1";
    }, 300);
  });

  container.appendChild(backBtn);
}

function goBack() {
  document.getElementById("color-screen").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
  document.getElementById("flag-background").style.backgroundImage = "";
}
