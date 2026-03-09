const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const drawer = document.getElementById('mobile-drawer');
const overlay = document.getElementById('mobile-overlay');

function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
}

function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
}

menuOpen.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
