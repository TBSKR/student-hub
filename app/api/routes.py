from flask import jsonify

from app.api import bp


@bp.route("/api/health")
def health():
    return jsonify({"status": "ok"})
