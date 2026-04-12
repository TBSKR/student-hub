from flask import render_template

from app.data import data_loader
from app.journey import bp


@bp.route("/journey")
def index():
    checklist = data_loader.laad_checklist()
    week0 = [item for item in checklist if item["week"] == 0]
    week1 = [item for item in checklist if item["week"] == 1]

    journey_steps = [
        {"tool_id": "hva-account", "title": "1. Account activeren", "subtitle": "Je HvA-ID activeren"},
        {"tool_id": "eduroam", "title": "2. Wi-Fi instellen", "subtitle": "Eduroam op je devices"},
        {"tool_id": "brightspace", "title": "3. Digitale Leeromgeving", "subtitle": "Vakken en materiaal"},
        {"tool_id": "teams", "title": "4. Teams", "subtitle": "Chat met je klas"},
        {"tool_id": "onedrive", "title": "5. OneDrive", "subtitle": "Bestanden in de cloud"},
        {"tool_id": "rooster", "title": "6. Rooster", "subtitle": "Je lesrooster bekijken"},
    ]

    return render_template(
        "journey/index.html",
        active_page="journey",
        week0=week0,
        week1=week1,
        journey_steps=journey_steps,
    )
