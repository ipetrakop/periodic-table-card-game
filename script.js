const columnsContainer = document.getElementById('columns');
const messageEl = document.getElementById('message');
let elements = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(element) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.draggable = true;
  cardDiv.id = element.id;
  
  const electronInputs = element.electronConfig.map((val, index) => {
    return `<input type="text" maxlength="2" placeholder="Στοιβάδα ${index + 1}" data-layer="${index + 1}" value="${val || ''}" />`;
  }).join('');
  
  cardDiv.innerHTML = `
    <div><strong>${element.name} (Z=${element.Z})</strong></div>
    <div>Ηλεκτρονιακή δομή:</div>
    ${electronInputs}
  `;
  
  return cardDiv;
}

function createColumns(groups) {
  const groupNumbers = [...new Set(groups.map(el => el.group))].sort((a, b) => a - b);
  groupNumbers.forEach(groupNumber => {
    const column = document.createElement('div');
    column.className = 'column';
    column.id = `group${groupNumber}`;
    column.addEventListener('dragover', e => e.preventDefault());
    column.addEventListener('drop', dropHandler);
    
    const header = document.createElement('h3');
    header.textContent = `Ομάδα ${groupNumber} ηλεκτρονίων σθένους`;
    column.appendChild(header);
    
    columnsContainer.appendChild(column);
  });
}

function dropHandler(e) {
  e.preventDefault();
  const cardId = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  e.currentTarget.appendChild(card);
}

function dragStartHandler(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function setupDragAndDrop() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('dragstart', dragStartHandler);
  });
}

function checkOrder() {
  messageEl.textContent = 'Συγκρίνετε τη διάταξη που δημιουργήσατε με τον Περιοδικό Πίνακα. Τι παρατηρείτε;';
}

async function init() {
  const response = await fetch('elements.json');
  elements = await response.json();
  
  createColumns(elements);
  
  // Shuffle elements
  const shuffledElements = shuffle(elements.slice());
  
  // Create cards and append to first column initially
  const firstGroupColumn = document.getElementById(`group${Math.min(...elements.map(e => e.group))}`);
  shuffledElements.forEach(element => {
    const card = createCard(element);
    firstGroupColumn.appendChild(card);
  });
  
  setupDragAndDrop();
  
  document.getElementById('checkBtn').addEventListener('click', checkOrder);
}

window.onload = init;
