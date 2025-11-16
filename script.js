// Ορισμός των καρτών (παρόμοια με το Word)
const cardsData = [
  {
    name: "Υδρογόνο",
    Z: 1,
    electronConfig: ["1"],
  },
  {
    name: "Ήλιο",
    Z: 2,
    electronConfig: ["2"],
  },
  {
    name: "Λίθιο",
    Z: 3,
    electronConfig: ["2", "1"],
  },
  {
    name: "Βηρύλλιο",
    Z: 4,
    electronConfig: ["2", "2"],
  },
  {
    name: "Βόριο",
    Z: 5,
    electronConfig: ["2", "3"],
  },
  {
    name: "Άνθρακας",
    Z: 6,
    electronConfig: ["2", "4"],
  },
  {
    name: "Άζωτο",
    Z: 7,
    electronConfig: ["2", "5"],
  },
  {
    name: "Οξυγόνο",
    Z: 8,
    electronConfig: ["2", "6"],
  },
  {
    name: "Φθόριο",
    Z: 9,
    electronConfig: ["2", "7"],
  },
  {
    name: "Νέον",
    Z: 10,
    electronConfig: ["2", "8"],
  },
  {
    name: "Νάτριο",
    Z: 11,
    electronConfig: ["2", "8", "1"],
  },
  {
    name: "Μαγνήσιο",
    Z: 12,
    electronConfig: ["2", "8", "2"],
  },
  {
    name: "Αλουμίνιο",
    Z: 13,
    electronConfig: ["2", "8", "3"],
  },
  {
    name: "Πυρίτιο",
    Z: 14,
    electronConfig: ["2", "8", "4"],
  },
  {
    name: "Φώσφορος",
    Z: 15,
    electronConfig: ["2", "8", "5"],
  },
  {
    name: "Θείο",
    Z: 16,
    electronConfig: ["2", "8", "6"],
  },
  {
    name: "Χλώριο",
    Z: 17,
    electronConfig: ["2", "8", "7"],
  },
  {
    name: "Αργό",
    Z: 18,
    electronConfig: ["2", "8", "8"],
  },
  {
    name: "Κάλιο",
    Z: 19,
    electronConfig: ["2", "8", "8", "1"],
  },
  {
    name: "Ασβέστιο",
    Z: 20,
    electronConfig: ["2", "8", "8", "2"],
  },
];

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
  card.draggable = true;
  card.id = "card-" + element.Z;
  card.innerHTML = `
    <h3>${element.name}</h3>
    <p>Z=${element.Z}</p>
    <label>Στοιβάδα 1: <input type="text" data-Z="${element.Z}" data-layer="1" maxlength="2" /></label>
    <label>Στοιβάδα 2: <input type="text" data-Z="${element.Z}" data-layer="2" maxlength="2" /></label>
    <label>Στοιβάδα 3: <input type="text" data-Z="${element.Z}" data-layer="3" maxlength="2" /></label>
  `;
  return card;
}

function init() {
  const container = document.createDocumentFragment();
  let shuffledCards = [...cardsData];
  shuffle(shuffledCards);
  shuffledCards.forEach((element) => {
    const card = createCard(element);
    container.appendChild(card);
  });
  document.body.querySelector("#cards-container").appendChild(container);
  setupDragAndDrop();
  
  document.querySelector("#checkBtn").addEventListener("click", () => {
    document.querySelector("#result").textContent = "Πλάκα!";
  });
}
function setupDragAndDrop() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
    });
  });
  
  document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", (e) => e.preventDefault());
    column.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const card = document.getElementById(id);
      e.currentTarget.appendChild(card);
    });
  });
}
window.onload = init;
