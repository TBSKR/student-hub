from flask import render_template, abort

from app.tools import bp
from app.data import data_loader


@bp.route("/tools/<tool_id>")
def detail(tool_id):
    tool = data_loader.zoek_tool(tool_id)
    if tool is None:
        abort(404)
    categorieen = data_loader.laad_categorieen()

    # Gerelateerde tools ophalen
    tools_map = {t.id: t for t in data_loader.laad_tools()}
    gerelateerde = [tools_map[rid] for rid in tool.relatedTools if rid in tools_map]

    return render_template("tools/detail.html", tool=tool, categorieen=categorieen, gerelateerde=gerelateerde)


@bp.route("/tools")
def index():
    tools = data_loader.laad_tools()
    categorieen = data_loader.laad_categorieen()

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
