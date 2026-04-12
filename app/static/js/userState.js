/**
 * Eenvoudige user state API bovenop localStorage (JSON-waarden).
 * Keys zijn logische namen; intern wordt hva:hub:<key> gebruikt.
 */
(function (global) {
    var PREFIX = "hva:hub:";

    function parse(raw) {
        if (raw == null || raw === "") return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function get(key) {
        if (!key) return null;
        return parse(global.localStorage.getItem(PREFIX + key));
    }

    function set(key, value) {
        if (!key) return null;
        global.localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return value;
    }

    function remove(key) {
        if (!key) return;
        global.localStorage.removeItem(PREFIX + key);
    }

    /** Vaste sleutels voor consistente opslag door de app. */
    var keys = {
        OPLEIDING: "opleiding",
    };

    global.hvaUserState = {
        get: get,
        set: set,
        remove: remove,
        keys: keys,
    };
})(window);
