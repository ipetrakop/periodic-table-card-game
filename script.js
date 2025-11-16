const cardsData = [
  { name: "Υδρογόνο", Z: 1, electronConfig: ["1", "", "", ""], group: 1 },
  { name: "Ήλιο", Z: 2, electronConfig: ["2", "", "", ""], group: 18 },
  { name: "Λίθιο", Z: 3, electronConfig: ["2", "1", "", ""], group: 1 },
  { name: "Βηρύλλιο", Z: 4, electronConfig: ["2", "2", "", ""], group: 2 },
  { name: "Βόριο", Z: 5, electronConfig: ["2", "3", "", ""], group: 13 },
  { name: "Άνθρακας", Z: 6, electronConfig: ["2", "4", "", ""], group: 14 },
  { name: "Άζωτο", Z: 7, electronConfig: ["2", "5", "", ""], group: 15 },
  { name: "Οξυγόνο", Z: 8, electronConfig: ["2", "6", "", ""], group: 16 },
  { name: "Φθόριο", Z: 9, electronConfig: ["2", "7", "", ""], group: 17 },
  { name: "Νέον", Z: 10, electronConfig: ["2", "8", "", ""], group: 18 },
  { name: "Νάτριο", Z: 11, electronConfig: ["2", "8", "1", ""], group: 1 },
  { name: "Μαγνήσιο", Z: 12, electronConfig: ["2", "8", "2", ""], group: 2 },
  { name: "Αλουμίνιο", Z: 13, electronConfig: ["2", "8", "3", ""], group: 13 },
  { name: "Πυρίτιο", Z: 14, electronConfig: ["2", "8", "4", ""], group: 14 },
  { name: "Φώσφορος", Z: 15, electronConfig: ["2", "8", "5", ""], group: 15 },
  { name: "Θείο", Z: 16, electronConfig: ["2", "8", "6", ""], group: 16 },
  { name: "Χλώριο", Z: 17, electronConfig: ["2", "8", "7", ""], group: 17 },
  { name: "Αργό", Z: 18, electronConfig: ["2", "8", "8", ""], group: 18 },
  { name: "Κάλιο", Z: 19, electronConfig: ["2", "8", "8", "1"], group: 1 },
  { name: "Ασβέστιο", Z: 20, electronConfig: ["2", "8", "8", "2"], group: 2 },
];

const container = document.getElementById("cards-container");
const resultEl = document.getElementById("result");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(element) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = "card-" + element.Z;
  card.innerHTML = `
    <h3>${element.name}</h3>
    <p>Z=${element.Z}</p>
    <label>Στοιβάδα 1: <input type="text" data-Z="${element.Z}" data-layer="1" maxlength="2" /></label>
    <label>Στοιβάδα 2: <input type="text" data-Z="${element.Z}" data-layer="2" maxlength="2" /></label>
    <label>Στοιβάδα 3: <input type="text" data-Z="${element.Z}" data-layer="3" maxlength="2" /></label>
    <label>Στοιβάδα 4: <input type="text" data-Z="${element.Z}" data-layer="4" maxlength="2" /></label>
  `;
  return card;
}

function init() {
  const shuffledCards = shuffle(cardsData.slice());
  shuffledCards.forEach((element) => {
    const card = createCard(element);
    container.appendChild(card);
  });
  document.getElementById("checkBtn").addEventListener("click", checkOrder);
}

function checkOrder() {
  let allCorrect = true;
  cardsData.forEach((element) => {
    element.electronConfig.forEach((val, index) => {
      const input = document.querySelector(
        `input[data-Z="${element.Z}"][data-layer="${index + 1}"]`
      );
      if (!input || input.value !== val) {
        allCorrect = false;
        if (input) input.style.borderColor = "red";
      } else {
        if (input) input.style.borderColor = "green";
      }
    });
  });
  resultEl.textContent = allCorrect
    ? "Συγχαρητήρια! Όλα σωστά."
    : "Υπάρχουν λάθη, δοκιμάστε ξανά.";
}

window.onload = init;
