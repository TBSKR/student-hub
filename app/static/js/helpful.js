function getToolFeedbackKey(toolId) {
    return "toolFeedback:" + toolId;
}

function applyFeedbackState(container, toolId) {
    var storageKey = getToolFeedbackKey(toolId);
    var saved = localStorage.getItem(storageKey);
    var thanks = container.querySelector("[data-feedback-thanks]");
    var buttons = container.querySelectorAll("[data-feedback-value]");

    if (!buttons || buttons.length === 0) return;

    buttons.forEach(function (btn) {
        btn.disabled = false;
        btn.classList.remove("is-selected");
        btn.setAttribute("aria-pressed", "false");
    });

    if (thanks) thanks.hidden = true;

    if (saved === "yes" || saved === "no") {
        var selected = container.querySelector('[data-feedback-value="' + saved + '"]');
        if (selected) {
            selected.classList.add("is-selected");
            selected.setAttribute("aria-pressed", "true");
        }
        if (thanks) thanks.hidden = false;
    }
}

function initToolFeedback() {
    var containers = document.querySelectorAll("[data-tool-feedback]");
    containers.forEach(function (container) {
        var toolId = container.getAttribute("data-tool-feedback");
        if (!toolId) return;

        applyFeedbackState(container, toolId);

        var storageKey = getToolFeedbackKey(toolId);
        var thanks = container.querySelector("[data-feedback-thanks]");
        var buttons = container.querySelectorAll("[data-feedback-value]");

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var value = btn.getAttribute("data-feedback-value");
                if (value !== "yes" && value !== "no") return;

                var alreadySaved = localStorage.getItem(storageKey);
                // Geen dubbele opslag: schrijf niet opnieuw als de waarde al hetzelfde is.
                if (alreadySaved !== value) {
                    localStorage.setItem(storageKey, value);
                }

                // UI update direct na wijziging
                buttons.forEach(function (b) {
                    var isSelected = b === btn;
                    b.classList.toggle("is-selected", isSelected);
                    b.setAttribute("aria-pressed", isSelected ? "true" : "false");
                });

                if (thanks) thanks.hidden = false;
            });
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToolFeedback);
} else {
    initToolFeedback();
}

