from dataclasses import asdict

from flask import jsonify

from app.api import bp
from app.data import data_loader


@bp.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@bp.route("/api/tools")
def tools_lijst():
    tools = data_loader.laad_tools()
    return jsonify({
        "count": len(tools),
        "items": [asdict(t) for t in tools]
    })


@bp.route("/api/tools/<tool_id>")
def tool_detail(tool_id):
    tool = data_loader.zoek_tool(tool_id)
    if not tool:
        return jsonify({"error": "Tool niet gevonden"}), 404
    return jsonify(asdict(tool))


@bp.route("/api/tool-categories")
def tool_categorieen():
    return jsonify(data_loader.laad_categorieen())
