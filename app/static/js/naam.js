var input = document.getElementById("naam-input");
var knop = document.getElementById("naam-opslaan");

if (input && knop) {
    knop.addEventListener("click", function () {
        var naam = input.value.trim();
        fetch("/api/state/naam", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ naam: naam })
        }).then(function () {
            location.reload();
        });
    });
}
