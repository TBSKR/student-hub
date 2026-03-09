from flask import render_template

from app.tools import bp
from app.services.tool_service import get_alle_tools, get_categorieen


@bp.route("/tools")
def index():
    tools = get_alle_tools()
    categorieen = get_categorieen()

    # Groepeer tools per categorie
    tools_per_categorie = {}
    for tool in tools:
        cat = tool.category
        if cat not in tools_per_categorie:
            tools_per_categorie[cat] = []
        tools_per_categorie[cat].append(tool)

    return render_template(
        "tools/index.html",
        active_page="tools",
        tools=tools,
        tools_per_categorie=tools_per_categorie,
        categorieen=categorieen,
    )
