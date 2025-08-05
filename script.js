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

  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color.color;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";

    btn.addEventListener("click", function () {
      if (btn.disabled) return;

      // Disable all buttons at once
      allButtons.forEach(b => b.disabled = true);

      const audio = new Audio(`sounds/${lang}_${color.name}.mp3`);
      audio.play().catch(() => {
        console.log(`Placeholder: ${lang}_${color.name}`);
      });

      // 💧 Jemné zprůhlednění s barvou pozadí zachovanou
      btn.style.opacity = "0.6";

      // 📢 Text "Přehrává se" bez transparence
      const label = document.createElement("span");
      label.textContent = "Přehrává se";
      label.style.position = "absolute";
      label.style.top = "50%";
      label.style.left = "50%";
      label.style.transform = "translate(-50%, -50%)";
      label.style.fontSize = "16px";
      label.style.fontWeight = "bold";
      label.style.color = "#ffffff";
      label.style.backgroundColor = "#000000";
      label.style.padding = "6px 12px";
      label.style.borderRadius = "6px";
      label.style.zIndex = "2";
      label.style.pointerEvents = "none";
      btn.appendChild(label);

      // 🕒 Po skončení + 0.5s reset všeho
      audio.addEventListener("ended", () => {
        setTimeout(() => {
          allButtons.forEach(b => b.disabled = false);
          btn.style.opacity = "1";
          btn.removeChild(label);
        }, 500);
      });
    });

    container.appendChild(btn);
    allButtons.push(btn);
  });
}

function goBack() {
  document.getElementById("color-screen").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
}
