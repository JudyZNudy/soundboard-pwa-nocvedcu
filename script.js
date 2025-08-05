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
  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color.color;
    btn.onclick = () => playSound(lang, color.name);
    container.appendChild(btn);
  });
}

function playSound(lang, color) {
  const audio = new Audio(`sounds/${lang}_${color}.mp3`);
  audio.play().catch(() => {
    console.log(`Placeholder: ${lang}_${color}`);
  });
}

function goBack() {
  document.getElementById("color-screen").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
}
