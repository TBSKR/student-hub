/**
 * Favorieten: zelfde opslag op tool-detail en homepage (hvaUserState.favorieten).
 * Events: CustomEvent 'hva:favorieten-changed' met detail { ids: string[] }.
 */
(function () {
    var STORAGE_KEY_FULL = "hva:hub:favorieten";

    function getIds() {
        if (!window.hvaUserState) return [];
        var raw = window.hvaUserState.get(window.hvaUserState.keys.FAVORIETEN);
        if (!Array.isArray(raw)) return [];
        return raw.filter(function (id) {
            return typeof id === "string";
        });
    }

    function setIds(ids) {
        if (!window.hvaUserState) return;
        window.hvaUserState.set(window.hvaUserState.keys.FAVORIETEN, ids);
        document.dispatchEvent(
            new CustomEvent("hva:favorieten-changed", {
                bubbles: true,
                detail: { ids: ids.slice() },
            })
        );
    }

    function isFavorite(toolId) {
        return getIds().indexOf(toolId) !== -1;
    }

    function toggleFavorite(toolId) {
        var ids = getIds().slice();
        var i = ids.indexOf(toolId);
        if (i === -1) {
            ids.push(toolId);
        } else {
            ids.splice(i, 1);
        }
        setIds(ids);
        return i === -1;
    }

    function initDetail() {
        var btn = document.querySelector(".favoriet-btn[data-tool-id]");
        if (!btn || !window.hvaUserState) return;
        var toolId = btn.getAttribute("data-tool-id");
        if (!toolId) return;

        function render() {
            var on = isFavorite(toolId);
            btn.classList.toggle("actief", on);
            btn.setAttribute("aria-pressed", on ? "true" : "false");
            btn.textContent = on ? "★ Favoriet" : "☆ Favoriet";
        }

        render();
        btn.addEventListener("click", function () {
            toggleFavorite(toolId);
            render();
        });
    }

    function parseToolsMeta() {
        var el = document.getElementById("hub-opleiding-config");
        if (!el) return null;
        try {
            var c = JSON.parse(el.textContent);
            return {
                tools: c.tools || {},
                categorieLabels: c.categorieLabels || {},
            };
        } catch (e) {
            return null;
        }
    }

    function initHome() {
        var grid = document.getElementById("home-favorieten-grid");
        var leeg = document.getElementById("home-favorieten-leeg");
        if (!grid || !window.hvaUserState) return;

        var meta = parseToolsMeta();
        if (!meta) return;

        function bouwKaarten() {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }
            var ids = getIds();
            var tools = meta.tools;
            var categorieLabels = meta.categorieLabels;

            if (leeg) {
                leeg.hidden = ids.length > 0;
            }
            grid.hidden = ids.length === 0;

            ids.forEach(function (tid) {
                var t = tools[tid];
                if (!t) return;

                var catLabel = categorieLabels[t.category] || t.category;
                var card =
                    typeof window.hvaBuildToolCard === "function"
                        ? window.hvaBuildToolCard(t, catLabel)
                        : null;
                if (card) grid.appendChild(card);
            });
        }

        bouwKaarten();

        document.addEventListener("hva:favorieten-changed", bouwKaarten);
        window.addEventListener("storage", function (ev) {
            if (ev.key === STORAGE_KEY_FULL) {
                bouwKaarten();
            }
        });
    }

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    ready(function () {
        initDetail();
        initHome();
    });
})();
