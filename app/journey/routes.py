from flask import render_template

from app.journey import bp


@bp.route("/journey")
def index():
    return render_template("journey/index.html", active_page="journey")
