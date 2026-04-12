from flask import render_template, abort

from app.tools import bp
from app.data import data_loader
from app.tools.service import tool_service


@bp.route("/tools/<tool_id>")
def detail(tool_id):
    tool = data_loader.zoek_tool(tool_id)
    if tool is None:
        abort(404)

    return render_template(
        "tools/detail.html",
        tool=tool,
        categorieen=data_loader.laad_categorieen(),
        gerelateerde=tool_service.gerelateerde_tools(tool),
    )


@bp.route("/tools")
def index():
    return render_template(
        "tools/index.html",
        active_page="tools",
        tools=data_loader.laad_tools(),
        tools_per_categorie=tool_service.groepeer_per_categorie(),
        categorieen=data_loader.laad_categorieen(),
    )
