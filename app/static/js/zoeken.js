var zoekInput = document.getElementById("zoek-input");
var toolCards = document.querySelectorAll(".tool-card");
var categorieSections = document.querySelectorAll(".tools-categorie");
var categoriePills = document.querySelectorAll(".filter-pill:not(#filter-verplicht)");
var verplichtPill = document.getElementById("filter-verplicht");
var toolCount = document.querySelector(".tools-count");
var geenResultaten = document.getElementById("geen-resultaten");
var geenResultatenTitel = document.getElementById("geen-resultaten-titel");
var geenResultatenSuggestie = document.getElementById("geen-resultaten-suggestie");
var timer = null;
var actieveCategorie = "alle";
var verplichtActief = false;

/** Levenshtein-afstand (klein = meer gelijk). */
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var i, j;
    var matrix = [];
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

/** Kleinste afstand tussen zoekterm en de toolnaam (inclusief losse woorden). */
function afstandTotToolnaam(zoekterm, naamLower) {
    var termen = [naamLower];
    naamLower.split(/\s+/).forEach(function (w) {
        if (w.length >= 2) termen.push(w);
    });
    var best = Infinity;
    termen.forEach(function (t) {
        var d = levenshtein(zoekterm, t);
        if (d < best) best = d;
    });
    return best;
}

/** Kleinste afstand tot toolnaam én tot woorden in data-zoek (what/when). */
function besteAfstandTotCard(zoekterm, card) {
    var naamLower = card.getAttribute("data-naam") || "";
    var best = afstandTotToolnaam(zoekterm, naamLower);
    var bron = (card.getAttribute("data-zoek") || "").toLowerCase();
    bron.split(/\s+/).forEach(function (w) {
        w = w.replace(/[^a-z0-9àáâãäåæçèéêëìíîïðñòóôõöùúûüýþß-]/gi, "");
        if (w.length < 3) return;
        var d = levenshtein(zoekterm, w);
        if (d < best) best = d;
    });
    return best;
}

/**
 * Zoekt de meest waarschijnlijke tool bij een typo / bijna-match (of exacte naam
 * bij 0 resultaten door filters — klik zet filters terug).
 * @returns {{ displayName: string, zoekFragment: string } | null}
 */
function vindSuggestieVoorZoekterm(zoekterm) {
    if (zoekterm.length < 2) return null;

    var threshold = Math.min(4, Math.max(2, Math.floor(zoekterm.length / 2) + 1));
    var best = null;
    var bestScore = Infinity;

    toolCards.forEach(function (card) {
        var naamLower = card.getAttribute("data-naam") || "";
        var h3 = card.querySelector(".tool-card-link h3");
        var displayName = h3 ? h3.textContent.trim() : naamLower;

        var score = besteAfstandTotCard(zoekterm, card);
        if (score <= threshold && score < bestScore) {
            bestScore = score;
            best = {
                displayName: displayName,
                zoekFragment: displayName,
            };
        }
    });

    return best || null;
}

function resetFiltersNaarAlle() {
    actieveCategorie = "alle";
    verplichtActief = false;
    categoriePills.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-categorie") === "alle");
    });
    if (verplichtPill) verplichtPill.classList.remove("active");
}

function updateGeenResultatenTekst(zoekterm, aantalZichtbaar) {
    if (!geenResultaten || !geenResultatenTitel) return;

    var toonLeeg =
        aantalZichtbaar === 0 &&
        (zoekterm || actieveCategorie !== "alle" || verplichtActief);
    geenResultaten.style.display = toonLeeg ? "" : "none";
    if (!toonLeeg) return;

    geenResultatenSuggestie.hidden = true;
    geenResultatenSuggestie.innerHTML = "";

    if (zoekterm) {
        geenResultatenTitel.textContent = 'Geen tools gevonden voor "' + zoekterm + '".';

        var sug = vindSuggestieVoorZoekterm(zoekterm);
        if (sug && geenResultatenSuggestie) {
            geenResultatenSuggestie.hidden = false;
            var intro = document.createElement("span");
            intro.textContent = "Bedoel je ";
            geenResultatenSuggestie.appendChild(intro);

            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "geen-resultaten-suggestie-btn";
            btn.textContent = sug.displayName;
            btn.addEventListener("click", function () {
                zoekInput.value = sug.zoekFragment;
                resetFiltersNaarAlle();
                filterTools();
                zoekInput.focus();
            });
            geenResultatenSuggestie.appendChild(btn);

            var vraag = document.createElement("span");
            vraag.textContent = "?";
            geenResultatenSuggestie.appendChild(vraag);
        }
    } else {
        geenResultatenTitel.textContent = "Geen tools gevonden met deze filters.";
    }
}

function filterTools() {
    var zoekterm = zoekInput.value.toLowerCase().trim();
    var aantalZichtbaar = 0;

    toolCards.forEach(function (card) {
        var naam = card.getAttribute("data-naam");
        var categorie = card.getAttribute("data-categorie");
        var zoekBron = card.getAttribute("data-zoek") || naam + " " + categorie;
        var matchZoek = !zoekterm || zoekBron.includes(zoekterm);
        var matchCategorie = actieveCategorie === "alle" || categorie === actieveCategorie;
        var matchVerplicht = !verplichtActief || card.getAttribute("data-required") === "true";
        card.style.display = matchZoek && matchCategorie && matchVerplicht ? "" : "none";
        if (matchZoek && matchCategorie && matchVerplicht) aantalZichtbaar++;

        var h3 = card.querySelector(".tool-card-link h3");
        if (!h3) return;
        var origNaam = h3.textContent;
        if (zoekterm && naam.includes(zoekterm)) {
            var start = naam.indexOf(zoekterm);
            var eind = start + zoekterm.length;
            h3.innerHTML =
                origNaam.substring(0, start) +
                "<mark>" +
                origNaam.substring(start, eind) +
                "</mark>" +
                origNaam.substring(eind);
        } else {
            h3.innerHTML = origNaam;
        }
    });

    categorieSections.forEach(function (section) {
        var zichtbaar =
            section.querySelectorAll('.tool-card:not([style*="none"])').length > 0;
        section.style.display = zichtbaar ? "" : "none";
    });

    toolCount.textContent = aantalZichtbaar + " tools beschikbaar";
    updateGeenResultatenTekst(zoekterm, aantalZichtbaar);
}

zoekInput.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(filterTools, 200);
});

categoriePills.forEach(function (pill) {
    pill.addEventListener("click", function () {
        actieveCategorie = pill.getAttribute("data-categorie");
        categoriePills.forEach(function (p) {
            p.classList.remove("active");
        });
        pill.classList.add("active");
        filterTools();
    });
});

if (verplichtPill) {
    verplichtPill.addEventListener("click", function () {
        verplichtActief = !verplichtActief;
        verplichtPill.classList.toggle("active", verplichtActief);
        filterTools();
    });
}
