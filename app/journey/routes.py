from app.journey import bp


@bp.route("/journey")
def index():
    return "<h1>Journey</h1><p>Komt binnenkort.</p>"
