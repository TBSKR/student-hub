import json
import os

from app.models.tool import Tool


DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

CATEGORIES = {"samenwerken", "schrijven", "data", "creatie", "dev", "overig"}

REQUIRED_FIELDS = [
    "id", "name", "category", "icon", "what", "when",
    "whatExtended", "gettingStarted", "tips", "relatedTools",
    "platform"
]


def load_tools():
    with open(os.path.join(DATA_DIR, 'tools.seed.json')) as f:
        return json.load(f)


def load_category_labels():
    with open(os.path.join(DATA_DIR, 'category-labels.seed.json')) as f:
        return json.load(f)


def test_alle_velden_aanwezig():
    tools = load_tools()
    for tool in tools:
        for field in REQUIRED_FIELDS:
            assert field in tool, f"Veld '{field}' mist bij tool '{tool.get('id', '?')}'"
            assert tool[field], f"Veld '{field}' is leeg bij tool '{tool.get('id', '?')}'"


def test_categorieen_geldig():
    tools = load_tools()
    for tool in tools:
        assert tool["category"] in CATEGORIES, f"Ongeldige categorie '{tool['category']}' bij tool '{tool['id']}'"


def test_alle_categorieen_vertegenwoordigd():
    tools = load_tools()
    gebruikte_cats = {tool["category"] for tool in tools}
    assert gebruikte_cats == CATEGORIES


def test_category_labels_compleet():
    labels = load_category_labels()
    assert set(labels.keys()) == CATEGORIES


def test_unieke_ids():
    tools = load_tools()
    ids = [tool["id"] for tool in tools]
    assert len(ids) == len(set(ids)), "Dubbele tool IDs gevonden"


def test_related_tools_bestaan():
    tools = load_tools()
    alle_ids = {tool["id"] for tool in tools}
    for tool in tools:
        for related in tool["relatedTools"]:
            assert related in alle_ids, f"Related tool '{related}' bij '{tool['id']}' bestaat niet"


def test_tool_model_werkt():
    tools = load_tools()
    for data in tools:
        tool = Tool(**data)
        assert tool.id == data["id"]
        assert tool.name == data["name"]


def test_social_proof_is_string():
    tools = load_tools()
    for tool in tools:
        if "socialProof" in tool:
            assert isinstance(tool["socialProof"], str), \
                f"socialProof bij '{tool['id']}' moet een string zijn"
