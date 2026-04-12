from flask import render_template

from app.main import bp
from app.data import laad_tools, laad_categorieen


@bp.route("/")
def index():
    aanbevolen = [t for t in laad_tools() if t.recommended][:4]
    return render_template("index.html", active_page="home", aanbevolen=aanbevolen, categorieen=laad_categorieen())
