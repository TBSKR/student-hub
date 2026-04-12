from flask import render_template

from app.help import bp
from app.data import data_loader


@bp.route("/help")
def index():
    categorieen = data_loader.laad_help_categorieen()
    return render_template("help/index.html", active_page="help", categorieen=categorieen)
