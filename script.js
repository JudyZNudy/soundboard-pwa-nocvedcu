const colorLabels = {
  en: ["purple", "red", "gray", "orange", "green", "yellow", "blue"],
  es: ["púrpura", "rojo", "gris", "naranja", "verde", "amarillo", "azul"],
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

let currentLang = "";
let allButtons = [];

function openLanguage(lang) {
  currentLang = lang;
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("color-screen").style.display = "block";

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
      audio.play().catch(() => console.log(`Placeholder: ${lang}_${color.name}`));
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

  // Přidání tlačítka Zpět
  const backBtn = document.createElement("button");
  backBtn.textContent = "Zpět";
  backBtn.className = "back-button";
  backBtn.addEventListener("click", goBack);
  container.appendChild(backBtn);
}

function goBack() {
  document.getElementById("color-screen").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
}
