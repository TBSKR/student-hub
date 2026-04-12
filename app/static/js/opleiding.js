/**
 * Opleidingsselector + aanbevelingen op de homepage.
 * Dispatch: document CustomEvent 'hva:opleiding-changed' met detail { opleiding, label }.
 */
(function () {
    function parseConfig() {
        var el = document.getElementById("hub-opleiding-config");
        if (!el) return null;
        try {
            return JSON.parse(el.textContent);
        } catch (e) {
            return null;
        }
    }

    function init() {
        var config = parseConfig();
        var select = document.getElementById("opleiding-select");
        var grid = document.getElementById("home-aanbevelingen-grid");
        var sub = document.getElementById("home-aanbevelingen-sub");
        if (!config || !select || !grid) return;

        var opleidingen = config.opleidingen || [];
        var aanbevelingen = config.aanbevelingen || {};
        var tools = config.tools || {};
        var categorieLabels = config.categorieLabels || {};
        var defaultId = config.defaultOpleiding || "anders";

        var labelById = {};
        opleidingen.forEach(function (o) {
            if (o && o.id) labelById[o.id] = o.label || o.id;
        });

        function geldigeOpleiding(id) {
            return labelById[id] != null;
        }

        function huidigeOpleidingId() {
            var opgeslagen = window.hvaUserState && window.hvaUserState.get(window.hvaUserState.keys.OPLEIDING);
            if (typeof opgeslagen === "string" && geldigeOpleiding(opgeslagen)) {
                return opgeslagen;
            }
            return defaultId;
        }

        function toolIdsVoor(opleidingId) {
            var ids = aanbevelingen[opleidingId];
            if (!ids || !ids.length) ids = aanbevelingen[defaultId] || [];
            return ids;
        }

        function bouwGrid(opleidingId) {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }
            var ids = toolIdsVoor(opleidingId);
            ids.forEach(function (tid) {
                var t = tools[tid];
                if (!t) return;

                var catLabel = categorieLabels[t.category] || t.category;
                var a = document.createElement("a");
                a.href = "/tools/" + encodeURIComponent(t.id);
                a.className = "tool-card";

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
                span.textContent = catLabel;
                info.appendChild(h3);
                info.appendChild(span);

                a.appendChild(iconWrap);
                a.appendChild(info);
                grid.appendChild(a);
            });
        }

        function zetSubtekst(opleidingId) {
            if (!sub) return;
            var label = labelById[opleidingId] || "";
            if (label) {
                sub.textContent =
                    "Geselecteerd: " +
                    label +
                    ". Deze tools passen goed bij je studierichting.";
                sub.hidden = false;
            } else {
                sub.textContent = "";
                sub.hidden = true;
            }
        }

        function pasUiAan(opleidingId, dispatchEvent) {
            select.value = opleidingId;
            bouwGrid(opleidingId);
            zetSubtekst(opleidingId);
            if (dispatchEvent) {
                var evt = new CustomEvent("hva:opleiding-changed", {
                    bubbles: true,
                    detail: {
                        opleiding: opleidingId,
                        label: labelById[opleidingId] || "",
                    },
                });
                document.dispatchEvent(evt);
            }
        }

        function resolveStartId() {
            var opgeslagen =
                window.hvaUserState && window.hvaUserState.get(window.hvaUserState.keys.OPLEIDING);
            if (typeof opgeslagen === "string" && geldigeOpleiding(opgeslagen)) {
                return opgeslagen;
            }
            if (window.hvaUserState) {
                window.hvaUserState.set(window.hvaUserState.keys.OPLEIDING, defaultId);
            }
            return defaultId;
        }

        var startId = resolveStartId();
        pasUiAan(startId, false);

        select.addEventListener("change", function () {
            var id = select.value;
            if (!geldigeOpleiding(id)) return;
            if (window.hvaUserState) {
                window.hvaUserState.set(window.hvaUserState.keys.OPLEIDING, id);
            }
            pasUiAan(id, true);
        });

        window.addEventListener("storage", function (ev) {
            if (!window.hvaUserState) return;
            var expected = "hva:hub:" + window.hvaUserState.keys.OPLEIDING;
            if (ev.key !== expected) return;
            var id = huidigeOpleidingId();
            if (id !== select.value) {
                pasUiAan(id, false);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
