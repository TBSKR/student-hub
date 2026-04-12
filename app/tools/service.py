from app.data import data_loader


class ToolService:
    def __init__(self, loader):
        self.loader = loader

    def groepeer_per_categorie(self):
        tools_per_categorie = {}
        for tool in self.loader.laad_tools():
            cat = tool.category
            if cat not in tools_per_categorie:
                tools_per_categorie[cat] = []
            tools_per_categorie[cat].append(tool)
        return tools_per_categorie

    def gerelateerde_tools(self, tool):
        tools_map = {t.id: t for t in self.loader.laad_tools()}
        return [tools_map[rid] for rid in tool.relatedTools if rid in tools_map]


tool_service = ToolService(data_loader)
