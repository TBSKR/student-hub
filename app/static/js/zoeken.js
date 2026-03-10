var zoekInput = document.getElementById('zoek-input');
var toolCards = document.querySelectorAll('.tool-card');
var categorieSections = document.querySelectorAll('.tools-categorie');
var filterPills = document.querySelectorAll('.filter-pill');
var geenResultaten = document.getElementById('geen-resultaten');
var timer = null;
var actieveCategorie = 'alle';

function filterTools() {
    var zoekterm = zoekInput.value.toLowerCase().trim();
    var aantalZichtbaar = 0;

    toolCards.forEach(function(card) {
        var naam = card.getAttribute('data-naam');
        var categorie = card.getAttribute('data-categorie');
        var matchZoek = !zoekterm || naam.includes(zoekterm) || categorie.includes(zoekterm);
        var matchFilter = actieveCategorie === 'alle' || categorie === actieveCategorie;
        card.style.display = (matchZoek && matchFilter) ? '' : 'none';
        if (matchZoek && matchFilter) aantalZichtbaar++;

        // Highlight zoekterm in tool naam
        var h3 = card.querySelector('h3');
        var origNaam = h3.textContent;
        if (zoekterm && naam.includes(zoekterm)) {
            var start = naam.indexOf(zoekterm);
            var eind = start + zoekterm.length;
            h3.innerHTML = origNaam.substring(0, start) + '<mark>' + origNaam.substring(start, eind) + '</mark>' + origNaam.substring(eind);
        } else {
            h3.innerHTML = origNaam;
        }
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

    geenResultaten.style.display = (aantalZichtbaar === 0 && (zoekterm || actieveCategorie !== 'alle')) ? '' : 'none';
}

// Debounce: wacht 200ms na laatste toetsaanslag
zoekInput.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(filterTools, 200);
});

filterPills.forEach(function(pill) {
    pill.addEventListener('click', function() {
        actieveCategorie = pill.getAttribute('data-categorie');
        filterPills.forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterTools();
    });
});
