var zoekInput = document.getElementById('zoek-input');
var toolCards = document.querySelectorAll('.tool-card');
var categorieSections = document.querySelectorAll('.tools-categorie');
var snelknoppen = document.querySelectorAll('.snelknop');
var timer = null;

function filterTools() {
    var zoekterm = zoekInput.value.toLowerCase().trim();

    toolCards.forEach(function(card) {
        var naam = card.getAttribute('data-naam');
        var categorie = card.getAttribute('data-categorie');
        var match = naam.includes(zoekterm) || categorie.includes(zoekterm);
        card.style.display = match ? '' : 'none';
    });

    // Verberg categorie als alle cards erin hidden zijn
    categorieSections.forEach(function(section) {
        var cards = section.querySelectorAll('.tool-card');
        var heeftZichtbaar = false;
        cards.forEach(function(card) {
            if (card.style.display !== 'none') {
                heeftZichtbaar = true;
            }
        });
        section.style.display = heeftZichtbaar ? '' : 'none';
    });
}

// Debounce: wacht 200ms na laatste toetsaanslag
zoekInput.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(filterTools, 200);
});

// Snelknoppen vullen de zoekbalk in en filteren
snelknoppen.forEach(function(knop) {
    knop.addEventListener('click', function() {
        zoekInput.value = knop.textContent;
        filterTools();
    });
});
