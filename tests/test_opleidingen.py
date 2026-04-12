import json
import os

from app.data import (
    DEFAULT_OPLEIDING_ID,
    laad_opleiding_config,
    tools_voor_opleiding_aanbevelingen,
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

VERWACHTE_OPLEIDING_IDS = {
    "cmd",
    "informatica",
    "bedrijfskunde",
    "communicatie",
    "techniek",
    "anders",
}


def load_tools_ids():
    with open(os.path.join(DATA_DIR, "tools.seed.json"), encoding="utf-8") as f:
        data = json.load(f)
    return {t["id"] for t in data}


def test_minimaal_zes_opleidingen_en_labels():
    cfg = laad_opleiding_config()
    opleidingen = cfg["opleidingen"]
    assert len(opleidingen) >= 6
    ids = {o["id"] for o in opleidingen}
    assert ids == VERWACHTE_OPLEIDING_IDS
    for o in opleidingen:
        assert o.get("label")


def test_aanbevelingen_verwijzen_naar_bestaande_tools():
    cfg = laad_opleiding_config()
    alle_tool_ids = load_tools_ids()
    mapping = cfg["aanbevelingenPerOpleiding"]
    for opleiding_id, tool_ids in mapping.items():
        assert opleiding_id in VERWACHTE_OPLEIDING_IDS
        assert isinstance(tool_ids, list)
        assert len(tool_ids) >= 1
        for tid in tool_ids:
            assert tid in alle_tool_ids, f"Onbekende tool '{tid}' bij opleiding '{opleiding_id}'"


def test_tools_voor_elke_optie():
    for oid in VERWACHTE_OPLEIDING_IDS:
        tools = tools_voor_opleiding_aanbevelingen(oid)
        assert len(tools) >= 1
        assert all(t.id for t in tools)


def test_default_opleiding_van_toepassing():
    tools = tools_voor_opleiding_aanbevelingen(DEFAULT_OPLEIDING_ID)
    assert len(tools) >= 1
