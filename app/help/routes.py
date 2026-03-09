from flask import render_template

from app.help import bp


@bp.route("/help")
def index():
    return render_template("help/index.html", active_page="help")
