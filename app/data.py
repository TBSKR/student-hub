import json
from pathlib import Path

from app.models.tool import Tool

DATA_DIR = Path(__file__).parent.parent / "data"


class DataLoader:
    def __init__(self, data_dir):
        self.data_dir = Path(data_dir)
        self._cache = {}

    def _laad_json(self, bestand):
        if bestand not in self._cache:
            with open(self.data_dir / bestand, encoding="utf-8") as f:
                self._cache[bestand] = json.load(f)
        return self._cache[bestand]

    def laad_tools(self):
        if "tools" not in self._cache:
            data = self._laad_json("tools.seed.json")
            self._cache["tools"] = [Tool(**item) for item in data]
        return self._cache["tools"]

    def zoek_tool(self, tool_id):
        return next((t for t in self.laad_tools() if t.id == tool_id), None)

    def laad_categorieen(self):
        return self._laad_json("category-labels.seed.json")

    def laad_checklist(self):
        return self._laad_json("checklist.seed.json")

    def laad_help_categorieen(self):
        return self._laad_json("help-categories.seed.json")


data_loader = DataLoader(DATA_DIR)


def laad_tools():
    return data_loader.laad_tools()


def zoek_tool(tool_id):
    return data_loader.zoek_tool(tool_id)


def laad_categorieen():
    return data_loader.laad_categorieen()


def laad_checklist():
    return data_loader.laad_checklist()


def laad_help_categorieen():
    return data_loader.laad_help_categorieen()
