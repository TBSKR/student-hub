from app.help import bp


@bp.route("/help")
def index():
    return "<h1>Help</h1><p>Komt binnenkort.</p>"
