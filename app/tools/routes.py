from app.tools import bp


@bp.route("/tools")
def index():
    return "<h1>Tools</h1><p>Komt binnenkort.</p>"
