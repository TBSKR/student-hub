var checkboxes = document.querySelectorAll('.checklist-check');
var opgeslagen = JSON.parse(localStorage.getItem('checklist') || '{}');
var totaal = checkboxes.length;

function updateVoortgang() {
    var afgevinkt = document.querySelectorAll('.checklist-check:checked').length;
    var procent = Math.round((afgevinkt / totaal) * 100);

    document.getElementById('voortgang-tekst').textContent = afgevinkt + ' van ' + totaal + ' stappen voltooid';
    document.getElementById('voortgang-vulling').style.width = procent + '%';
}

checkboxes.forEach(function (cb) {
    if (opgeslagen[cb.id]) {
        cb.checked = true;
    }

    cb.addEventListener('change', function () {
        opgeslagen[cb.id] = cb.checked;
        localStorage.setItem('checklist', JSON.stringify(opgeslagen));
        updateVoortgang();
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
