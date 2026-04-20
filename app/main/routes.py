from flask import render_template, session

from app.data import laad_categorieen, laad_opleiding_config, tools_meta_dict
from app.main import bp


@bp.route("/")
def index():
    categorieen = laad_categorieen()
    cfg = laad_opleiding_config()
    # Geen server-side aanbevelingen: eerste weergave is leeg tot de gebruiker een opleiding kiest (client-side).
    hub_client_config = {
        "opleidingen": cfg["opleidingen"],
        "aanbevelingen": cfg["aanbevelingenPerOpleiding"],
        "tools": tools_meta_dict(),
        "categorieLabels": categorieen,
    }

    return render_template(
        "index.html",
        active_page="home",
        aanbevolen=[],
        categorieen=categorieen,
        hub_client_config=hub_client_config,
        naam=session.get("naam", ""),
    )
