from flask import render_template

from app.data import (
    DEFAULT_OPLEIDING_ID,
    laad_categorieen,
    laad_opleiding_config,
    tools_meta_dict,
    tools_voor_opleiding_aanbevelingen,
)
from app.main import bp


@bp.route("/")
def index():
    categorieen = laad_categorieen()
    cfg = laad_opleiding_config()
    aanbevolen = tools_voor_opleiding_aanbevelingen(DEFAULT_OPLEIDING_ID)

    hub_client_config = {
        "opleidingen": cfg["opleidingen"],
        "aanbevelingen": cfg["aanbevelingenPerOpleiding"],
        "tools": tools_meta_dict(),
        "categorieLabels": categorieen,
        "defaultOpleiding": DEFAULT_OPLEIDING_ID,
    }

    return render_template(
        "index.html",
        active_page="home",
        aanbevolen=aanbevolen,
        categorieen=categorieen,
        hub_client_config=hub_client_config,
    )
