function initHelpCategories() {
    var categories = document.querySelectorAll('[data-help-category]');

    function closeAll(exceptPanelId) {
        categories.forEach(function (cat) {
            var panel = cat.querySelector('.help-category-panel');
            if (!panel) return;

            if (exceptPanelId && panel.id === exceptPanelId) return;

            panel.hidden = true;
            cat.classList.remove('is-open');
        });
    }

    categories.forEach(function (cat) {
        var btn = cat.querySelector('.help-category-button');
        var panel = cat.querySelector('.help-category-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', function () {
            if (cat.classList.contains('is-open')) {
                panel.hidden = true;
                cat.classList.remove('is-open');
                return;
            }

            closeAll(panel.id);
            panel.hidden = false;
            cat.classList.add('is-open');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelpCategories);
} else {
    initHelpCategories();
}

