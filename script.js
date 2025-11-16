const cardsData = [
  { name: "Υδρογόνο", Z: 1, electronConfig: ["1", "", "", ""], group: 1 },
  { name: "Ήλιο", Z: 2, electronConfig: ["2", "", "", ""], group: 8 },
  { name: "Λίθιο", Z: 3, electronConfig: ["2", "1", "", ""], group: 1 },
  { name: "Βηρύλλιο", Z: 4, electronConfig: ["2", "2", "", ""], group: 2 },
  { name: "Βόριο", Z: 5, electronConfig: ["2", "3", "", ""], group: 3 },
  { name: "Άνθρακας", Z: 6, electronConfig: ["2", "4", "", ""], group: 4 },
  { name: "Άζωτο", Z: 7, electronConfig: ["2", "5", "", ""], group: 5 },
  { name: "Οξυγόνο", Z: 8, electronConfig: ["2", "6", "", ""], group: 6 },
  { name: "Φθόριο", Z: 9, electronConfig: ["2", "7", "", ""], group: 7 },
  { name: "Νέον", Z: 10, electronConfig: ["2", "8", "", ""], group: 8 },
  { name: "Νάτριο", Z: 11, electronConfig: ["2", "8", "1", ""], group: 1 },
  { name: "Μαγνήσιο", Z: 12, electronConfig: ["2", "8", "2", ""], group: 2 },
  { name: "Αλουμίνιο", Z: 13, electronConfig: ["2", "8", "3", ""], group: 3 },
  { name: "Πυρίτιο", Z: 14, electronConfig: ["2", "8", "4", ""], group: 4 },
  { name: "Φώσφορος", Z: 15, electronConfig: ["2", "8", "5", ""], group: 5 },
  { name: "Θείο", Z: 16, electronConfig: ["2", "8", "6", ""], group: 6 },
  { name: "Χλώριο", Z: 17, electronConfig: ["2", "8", "7", ""], group: 7 },
  { name: "Αργό", Z: 18, electronConfig: ["2", "8", "8", ""], group: 8 },
  { name: "Κάλιο", Z: 19, electronConfig: ["2", "8", "8", "1"], group: 1 },
  { name: "Ασβέστιο", Z: 20, electronConfig: ["2", "8", "8", "2"], group: 2 },
];

const columnsContainer = document.getElementById("columns-container");
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
  card.draggable = true;
  card.innerHTML = `
    <h4>${element.name}</h4>
    <p>Z=${element.Z}</p>
    <label>Στοιβάδα 1: <input type="text" data-Z="${element.Z}" data-layer="1" maxlength="2" /></label>
    <label>Στοιβάδα 2: <input type="text" data-Z="${element.Z}" data-layer="2" maxlength="2" /></label>
    <label>Στοιβάδα 3: <input type="text" data-Z="${element.Z}" data-layer="3" maxlength="2" /></label>
    <label>Στοιβάδα 4: <input type="text" data-Z="${element.Z}" data-layer="4" maxlength="2" /></label>
  `;
  card.addEventListener("dragstart", dragStartHandler);
  return card;
}

function createColumns() {
  for (let i = 1; i <= 8; i++) {
    const col = document.createElement("div");
    col.className = "column";
    col.id = "group" + i;
    const header = document.createElement("h4");
    header.innerText = `Ομάδα ${i}`;
    col.appendChild(header);
    col.addEventListener("dragover", dragOverHandler);
    col.addEventListener("drop", dropHandler);
    columnsContainer.appendChild(col);
  }
}

function dragStartHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragOverHandler(e) {
  e.preventDefault();
}

function dropHandler(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  e.currentTarget.appendChild(card);
}

function init() {
  createColumns();
  const shuffledCards = shuffle(cardsData.slice());
  const initialColumn = document.createElement("div");
  initialColumn.className = "column";
  initialColumn.id = "initialColumn";
  const header = document.createElement("h4");
  header.innerText = "Ατάκτα στοιχεία";
  initialColumn.appendChild(header);
  columnsContainer.appendChild(initialColumn);

  shuffledCards.forEach((element) => {
    const card = createCard(element);
    initialColumn.appendChild(card);
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
