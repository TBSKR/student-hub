from flask import render_template

from app.tools import bp


@bp.route("/tools")
def index():
    return render_template("tools/index.html", active_page="tools")
