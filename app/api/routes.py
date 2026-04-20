from dataclasses import asdict

from flask import jsonify, request, session

from app.api import bp
from app.api.service import UserStateService
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


@bp.route("/api/state")
def state_ophalen():
    service = UserStateService(session)
    staat = service.haal_op()
    return jsonify(asdict(staat))


@bp.route("/api/state/favorites", methods=["PUT"])
def update_favorieten():
    service = UserStateService(session)
    service.sla_favorieten_op(request.json.get("favorieten", []))
    return jsonify({"ok": True})


@bp.route("/api/state/checklist", methods=["PUT"])
def update_checklist():
    service = UserStateService(session)
    service.sla_checklist_op(request.json.get("checklist", {}))
    return jsonify({"ok": True})


@bp.route("/api/state/opleiding", methods=["PUT"])
def update_opleiding():
    service = UserStateService(session)
    service.sla_opleiding_op(request.json.get("opleiding", ""))
    return jsonify({"ok": True})


@bp.route("/api/state/naam", methods=["PUT"])
def update_naam():
    service = UserStateService(session)
    service.sla_naam_op(request.json.get("naam", ""))
    return jsonify({"ok": True})
