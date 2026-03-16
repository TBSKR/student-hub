from flask import render_template

from app.data import laad_checklist, laad_tools
from app.journey import bp

STAPPEN_TOOLS = {
    "hva-account": ["eduroam", "outlook", "brightspace"],
    "eduroam": ["hva-account", "apps-hva"],
    "brightspace": ["teams", "onedrive", "office365"],
    "teams": ["outlook", "onedrive", "sharepoint"],
    "onedrive": ["sharepoint", "teams", "office365"],
    "rooster": ["sis", "brightspace", "teams"],
}


@bp.route("/journey")
def index():
    checklist = laad_checklist()
    week0 = [item for item in checklist if item["week"] == 0]
    week1 = [item for item in checklist if item["week"] == 1]

    tools = {t.id: t for t in laad_tools()}
    stappen_met_tools = {}
    for stap_id, tool_ids in STAPPEN_TOOLS.items():
        stappen_met_tools[stap_id] = [tools[tid] for tid in tool_ids if tid in tools]

    return render_template("journey/index.html", active_page="journey",
                           week0=week0, week1=week1, stappen_tools=stappen_met_tools)
