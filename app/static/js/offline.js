var banner = document.getElementById("offline-banner");

function toonOffline() {
    banner.hidden = false;
}

function verbergOffline() {
    banner.hidden = true;
}

if (!navigator.onLine) {
    toonOffline();
}

window.addEventListener("offline", toonOffline);
window.addEventListener("online", verbergOffline);
