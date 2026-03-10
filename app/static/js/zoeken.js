var zoekInput = document.getElementById('zoek-input');
var toolCards = document.querySelectorAll('.tool-card');
var categorieSections = document.querySelectorAll('.tools-categorie');
var categoriePills = document.querySelectorAll('.filter-pill:not(#filter-verplicht)');
var verplichtPill = document.getElementById('filter-verplicht');
var toolCount = document.querySelector('.tools-count');
var geenResultaten = document.getElementById('geen-resultaten');
var timer = null;
var actieveCategorie = 'alle';
var verplichtActief = false;

function filterTools() {
    var zoekterm = zoekInput.value.toLowerCase().trim();
    var aantalZichtbaar = 0;

    toolCards.forEach(function(card) {
        var naam = card.getAttribute('data-naam');
        var categorie = card.getAttribute('data-categorie');
        var matchZoek = !zoekterm || naam.includes(zoekterm) || categorie.includes(zoekterm);
        var matchCategorie = actieveCategorie === 'alle' || categorie === actieveCategorie;
        var matchVerplicht = !verplichtActief || card.getAttribute('data-required') === 'true';
        card.style.display = (matchZoek && matchCategorie && matchVerplicht) ? '' : 'none';
        if (matchZoek && matchCategorie && matchVerplicht) aantalZichtbaar++;

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

    categorieSections.forEach(function(section) {
        var zichtbaar = section.querySelectorAll('.tool-card:not([style*="none"])').length > 0;
        section.style.display = zichtbaar ? '' : 'none';
    });

    toolCount.textContent = aantalZichtbaar + ' tools beschikbaar';
    geenResultaten.style.display = (aantalZichtbaar === 0 && (zoekterm || actieveCategorie !== 'alle' || verplichtActief)) ? '' : 'none';
}

// Debounce: wacht 200ms na laatste toetsaanslag
zoekInput.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(filterTools, 200);
});

categoriePills.forEach(function(pill) {
    pill.addEventListener('click', function() {
        actieveCategorie = pill.getAttribute('data-categorie');
        categoriePills.forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterTools();
    });
});

verplichtPill.addEventListener('click', function() {
    verplichtActief = !verplichtActief;
    verplichtPill.classList.toggle('active', verplichtActief);
    filterTools();
});
