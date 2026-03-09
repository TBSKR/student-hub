from app.repositories.tool_repository import laad_tools, zoek_tool, laad_categorieen


def get_alle_tools():
    return laad_tools()


def get_tool(tool_id):
    return zoek_tool(tool_id)


def get_categorieen():
    return laad_categorieen()
