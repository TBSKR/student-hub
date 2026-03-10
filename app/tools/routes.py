from flask import render_template

from app.tools import bp
from app.data import laad_tools, laad_categorieen


@bp.route("/tools")
def index():
    tools = laad_tools()
    categorieen = laad_categorieen()

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
