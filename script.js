const board = document.getElementById('columns-container');
const message = document.getElementById('message');

fetch('cards.json')
.then(response => response.json())
.then(data => {
    data.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.draggable = true;

        cardDiv.innerHTML = `
            <strong>${card.symbol}</strong><br>
            ${card.name}<br>
            Z=${card.Z}<br>
            <input type="text" placeholder="Ηλεκτρονιακή δομή">
        `;

        // Drag events
        cardDiv.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', card.Z);
        });

        // Προσθήκη στις στήλες με βάση valence
        const col = document.querySelector(`.column[data-valence='${card.valence}']`);
        col.appendChild(cardDiv);
    });

    // Column drop events
    const columns = document.querySelectorAll('.column');
    columns.forEach(col => {
        col.addEventListener('dragover', e => e.preventDefault());
        col.addEventListener('drop', e => {
            e.preventDefault();
            const Z = e.dataTransfer.getData('text/plain');
            const card = document.querySelector(`.card strong:contains('${Z}')`) || document.querySelector(`.card`);
            if (card) col.appendChild(card.parentElement);
        });
    });
});

// Check button
document.getElementById('checkButton').addEventListener('click', () => {
    message.innerHTML = 'Έλεγξε τη διάταξη σου και σύγκρινέ την με τον Περιοδικό Πίνακα!';
});
