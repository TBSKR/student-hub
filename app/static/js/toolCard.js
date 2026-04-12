/**
 * Bouwt een tool-kaart (wrapper + link + beschrijving-accordion) voor homepage-scripts.
 */
(function (global) {
    function buildToolCard(t, catLabel) {
        if (!t || !t.id) return null;

        var card = document.createElement("div");
        card.className = "tool-card";

        var link = document.createElement("a");
        link.className = "tool-card-link";
        link.href = "/tools/" + encodeURIComponent(t.id);

        var iconWrap = document.createElement("div");
        iconWrap.className = "tool-card-icon";
        var img = document.createElement("img");
        img.src = "/static/img/tools/" + encodeURIComponent(t.id) + ".png";
        img.alt = t.name || "";
        iconWrap.appendChild(img);

        var info = document.createElement("div");
        info.className = "tool-card-info";
        var h3 = document.createElement("h3");
        h3.textContent = t.name || "";
        var span = document.createElement("span");
        span.className = "tool-card-categorie";
        span.textContent = catLabel || "";
        info.appendChild(h3);
        info.appendChild(span);
        link.appendChild(iconWrap);
        link.appendChild(info);

        card.appendChild(link);

        if (t.what || t.when) {
            var details = document.createElement("details");
            details.className = "tool-card-accordion";
            var summary = document.createElement("summary");
            summary.className = "tool-card-accordion-summary";
            summary.textContent = "Beschrijving";
            var panel = document.createElement("div");
            panel.className = "tool-card-accordion-panel";

            var l1 = document.createElement("p");
            l1.className = "tool-card-accordion-label";
            l1.textContent = "Waarvoor";
            var pWhat = document.createElement("p");
            pWhat.className = "tool-card-what";
            pWhat.textContent = t.what || "";
            var l2 = document.createElement("p");
            l2.className = "tool-card-accordion-label tool-card-accordion-label--when";
            l2.textContent = "Wanneer";
            var pWhen = document.createElement("p");
            pWhen.className = "tool-card-when";
            pWhen.textContent = t.when || "";

            panel.appendChild(l1);
            panel.appendChild(pWhat);
            panel.appendChild(l2);
            panel.appendChild(pWhen);
            details.appendChild(summary);
            details.appendChild(panel);
            card.appendChild(details);
        }

        return card;
    }

    global.hvaBuildToolCard = buildToolCard;
})(window);
