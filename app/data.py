import json
from pathlib import Path

from app.models.tool import Tool

DATA_DIR = Path(__file__).parent.parent / "data"


def laad_tools():
    with open(DATA_DIR / "tools.seed.json") as f:
        data = json.load(f)
    return [Tool(**item) for item in data]


def zoek_tool(tool_id):
    for tool in laad_tools():
        if tool.id == tool_id:
            return tool
    return None


def laad_categorieen():
    with open(DATA_DIR / "category-labels.seed.json") as f:
        return json.load(f)
