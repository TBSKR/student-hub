from flask import render_template

from app.help import bp
from app.data import laad_help_categorieen


@bp.route("/help")
def index():
    categorieen = laad_help_categorieen()
    return render_template("help/index.html", active_page="help", categorieen=categorieen)
