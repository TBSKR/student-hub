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
    var bannerTekst = document.getElementById('milestone-banner-tekst');

    banner.className = 'milestone-banner milestone-banner--' + type;
    bannerTekst.textContent = tekst;
    banner.style.display = 'flex';

    getoondeBanners['milestone_' + type] = true;
    localStorage.setItem('beloningen', JSON.stringify(getoondeBanners));

    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(function () {
        banner.style.display = 'none';
    }, 6000);

    banner.addEventListener('mouseenter', function () {
        if (bannerTimer) clearTimeout(bannerTimer);
    });
    banner.addEventListener('mouseleave', function () {
        bannerTimer = setTimeout(function () {
            banner.style.display = 'none';
        }, 3000);
    });
}

function checkMilestone(vorigProcent, nieuwProcent) {
    if (vorigProcent < 50 && nieuwProcent >= 50 && !getoondeBanners.milestone_50) {
        toonBanner('50', 'Goed bezig! Je bent halverwege 🎯');
    }
    if (vorigProcent < 100 && nieuwProcent >= 100 && !getoondeBanners.milestone_100) {
        toonBanner('100', 'Gefeliciteerd! Alles afgerond 🎉');
    }
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
        var vorigProcent = updateVoortgang();
        opgeslagen[cb.id] = cb.checked;
        localStorage.setItem('checklist', JSON.stringify(opgeslagen));
        var nieuwProcent = updateVoortgang();
        checkMilestone(vorigProcent, nieuwProcent);
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
