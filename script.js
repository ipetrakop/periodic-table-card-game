const board = document.getElementById('columns-container');
const message = document.getElementById('message');
let elementsData = [];

fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    elementsData = data;
    createCards(elementsData);
  });

function createCards(data) {
  data.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.draggable = true;
    cardDiv.dataset.Z = card.Z;
    cardDiv.dataset.valence = card.valence;
    cardDiv.dataset.electronConfig = card.electronConfig;

    cardDiv.innerHTML = `
      <strong>${card.symbol}</strong><br>
      ${card.name}<br>
      Z=${card.Z}<br>
      <input type="text" placeholder="Ηλεκτρονιακή δομή (π.χ. K(2) L(1))">
    `;

    addDragEvents(cardDiv);

    const col = document.querySelector(`.column[data-valence='${card.valence}']`);
    col.appendChild(cardDiv);
  });

  enableDrop();
}

function addDragEvents(card) {
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', card.dataset.Z);
  });
}

function enableDrop() {
  const columns = document.querySelectorAll('.column');
  columns.forEach(col => {
    col.addEventListener('dragover', e => e.preventDefault());
    col.addEventListener('drop', e => {
      e.preventDefault();
      const Z = e.dataTransfer.getData('text/plain');
      const card = document.querySelector(`.card[data-Z='${Z}']`);
      if (!card) return;

      col.appendChild(card);
      sortColumn(col);
    });
  });
}

function sortColumn(column) {
  const cards = Array.from(column.querySelectorAll('.card'));
  cards.sort((a,b) => Number(a.dataset.Z) - Number(b.dataset.Z));
  cards.forEach(c => column.appendChild(c));
}

document.getElementById('checkButton').addEventListener('click', () => {
  let allCorrect = true;

  elementsData.forEach(cardData => {
    const card = document.querySelector(`.card[data-Z='${cardData.Z}']`);
    const input = card.querySelector('input').value.trim();
    const correctConfig = card.dataset.electronConfig;

    if(input !== correctConfig) {
      allCorrect = false;
      card.style.borderColor = 'red';
    } else {
      card.style.borderColor = 'green';
    }
  });

  if(allCorrect) {
    message.innerHTML = 'Σωστά! Όλες οι ηλεκτρονιακές δομές και οι στήλες είναι σωστά!';
    message.style.color = 'green';
  } else {
    message.innerHTML = 'Υπάρχουν λάθη στις ηλεκτρονιακές δομές. Τα λάθος στοιχεία επισημαίνονται με κόκκινο.';
    message.style.color = 'red';
  }
});
