var checkboxes = document.querySelectorAll('.checklist-check');
var opgeslagen = JSON.parse(localStorage.getItem('checklist') || '{}');
var getoondeBanners = JSON.parse(localStorage.getItem('beloningen') || '{}');
var totaal = checkboxes.length;
var bannerTimer = null;

function updateVoortgang() {
    var afgevinkt = document.querySelectorAll('.checklist-check:checked').length;
    var procent = Math.round((afgevinkt / totaal) * 100);

    document.getElementById('voortgang-tekst').textContent = afgevinkt + ' van ' + totaal + ' stappen voltooid';
    document.getElementById('voortgang-vulling').style.width = procent + '%';

    return procent;
}

function toonBanner(type, tekst) {
    var banner = document.getElementById('milestone-banner');

    banner.className = 'milestone-banner milestone-banner--' + type;
    document.getElementById('milestone-banner-tekst').textContent = tekst;
    banner.style.display = 'flex';

    getoondeBanners['milestone_' + type] = true;
    localStorage.setItem('beloningen', JSON.stringify(getoondeBanners));

    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(function () {
        banner.style.display = 'none';
    }, 6000);
}

function confetti() {
    var laag = document.createElement('div');
    laag.className = 'confetti-laag';
    var kleuren = ['#02857D', '#25167A', '#351FB7', '#F35279', '#1E1649'];

    for (var i = 0; i < 22; i++) {
        var stuk = document.createElement('span');
        stuk.className = 'confetti-stuk';
        var hoek = (i / 22) * Math.PI * 2;
        var afstand = 200 + Math.random() * 300;
        stuk.style.setProperty('--x', Math.cos(hoek) * afstand + 'px');
        stuk.style.setProperty('--y', Math.sin(hoek) * afstand - 150 + 'px');
        stuk.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
        stuk.style.width = (5 + Math.random() * 5) + 'px';
        stuk.style.height = (4 + Math.random() * 6) + 'px';
        stuk.style.backgroundColor = kleuren[i % kleuren.length];
        laag.appendChild(stuk);
    }

    document.body.appendChild(laag);
    setTimeout(function () { laag.remove(); }, 3000);
}

document.getElementById('milestone-banner-sluit').addEventListener('click', function () {
    if (bannerTimer) clearTimeout(bannerTimer);
    document.getElementById('milestone-banner').style.display = 'none';
});

checkboxes.forEach(function (cb) {
    if (opgeslagen[cb.id]) {
        cb.checked = true;
    }

    cb.addEventListener('change', function () {
        opgeslagen[cb.id] = cb.checked;
        localStorage.setItem('checklist', JSON.stringify(opgeslagen));
        var procent = updateVoortgang();

        if (procent >= 50 && !getoondeBanners.milestone_50) {
            toonBanner('50', 'Goed bezig! Je bent halverwege.');
        }
        if (procent >= 100 && !getoondeBanners.milestone_100) {
            toonBanner('100', 'Gefeliciteerd! Alles afgerond.');
            confetti();
        }
    });
});

document.querySelectorAll('.checklist-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;
        var cb = item.querySelector('.checklist-check');
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
    });
});

updateVoortgang();
