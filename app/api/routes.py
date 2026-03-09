from dataclasses import asdict

from flask import jsonify

from app.api import bp
from app.services.tool_service import get_alle_tools, get_tool, get_categorieen


@bp.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@bp.route("/api/tools")
def tools_lijst():
    tools = get_alle_tools()
    return jsonify({
        "count": len(tools),
        "items": [asdict(t) for t in tools]
    })


@bp.route("/api/tools/<tool_id>")
def tool_detail(tool_id):
    tool = get_tool(tool_id)
    if not tool:
        return jsonify({"error": "Tool niet gevonden"}), 404
    return jsonify(asdict(tool))


@bp.route("/api/tool-categories")
def tool_categorieen():
    return jsonify(get_categorieen())
