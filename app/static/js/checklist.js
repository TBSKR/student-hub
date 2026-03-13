var checkboxes = document.querySelectorAll('.checklist-check');
var opgeslagen = JSON.parse(localStorage.getItem('checklist') || '{}');

checkboxes.forEach(function (cb) {
    if (opgeslagen[cb.id]) {
        cb.checked = true;
    }

    cb.addEventListener('change', function () {
        opgeslagen[cb.id] = cb.checked;
        localStorage.setItem('checklist', JSON.stringify(opgeslagen));
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
