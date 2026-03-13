from flask import render_template

from app.data import laad_checklist
from app.journey import bp


@bp.route("/journey")
def index():
    checklist = laad_checklist()
    week0 = [item for item in checklist if item["week"] == 0]
    week1 = [item for item in checklist if item["week"] == 1]
    return render_template("journey/index.html", active_page="journey", week0=week0, week1=week1)
