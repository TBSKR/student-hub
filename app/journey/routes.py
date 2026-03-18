from flask import render_template

from app.data import laad_checklist, laad_tools
from app.journey import bp


@bp.route("/journey")
def index():
    checklist = laad_checklist()
    week0 = [item for item in checklist if item["week"] == 0]
    week1 = [item for item in checklist if item["week"] == 1]

    # Voor elke journey-stap: welke tools (tool detailpagina) relevant zijn.
    # Let op: alleen tools die bij de stap horen worden getoond.
    journey_steps = [
        {
            "tool_id": "hva-account",
            "title": "1. Account activeren",
            "subtitle": "Je HvA-ID activeren",
            "tool_links": ["hva-account", "eduroam", "office365", "brightspace"],
        },
        {
            "tool_id": "eduroam",
            "title": "2. Wi-Fi instellen",
            "subtitle": "Eduroam op je devices",
            "tool_links": ["eduroam", "hva-account"],
        },
        {
            "tool_id": "brightspace",
            "title": "3. Brightspace",
            "subtitle": "Vakken en materiaal",
            "tool_links": ["brightspace", "office365", "hva-account"],
        },
        {
            "tool_id": "teams",
            "title": "4. Teams",
            "subtitle": "Chat met je klas",
            "tool_links": ["teams", "brightspace", "onedrive", "office365"],
        },
        {
            "tool_id": "onedrive",
            "title": "5. OneDrive",
            "subtitle": "Bestanden in de cloud",
            "tool_links": ["onedrive", "teams", "office365"],
        },
        {
            "tool_id": "rooster",
            "title": "6. Rooster",
            "subtitle": "Je lesrooster bekijken",
            "tool_links": ["rooster", "sis", "brightspace", "teams"],
        },
    ]

    tools = laad_tools()
    tool_map = {t.id: t for t in tools}

    return render_template(
        "journey/index.html",
        active_page="journey",
        week0=week0,
        week1=week1,
        journey_steps=journey_steps,
        tool_map=tool_map,
    )
