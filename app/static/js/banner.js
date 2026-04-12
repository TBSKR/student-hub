var banner = document.getElementById('welcome-banner');

if (localStorage.getItem('banner-gesloten')) {
    banner.classList.add('verborgen');
}

document.getElementById('banner-sluiten').addEventListener('click', function () {
    banner.classList.add('verborgen');
    localStorage.setItem('banner-gesloten', '1');
});
