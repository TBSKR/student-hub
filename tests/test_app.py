def test_app_starts(client):
    response = client.get("/")
    assert response.status_code == 200


def test_home_toont_lege_aanbevelingen_staat(client):
    response = client.get("/")
    assert response.status_code == 200
    html = response.data.decode("utf-8")
    assert "Nog geen persoonlijke aanbevelingen" in html
    assert "cta-kies-opleiding" in html
    assert "— Kies je opleiding —" in html


def test_tools_route(client):
    response = client.get("/tools")
    assert response.status_code == 200


def test_journey_route(client):
    response = client.get("/journey")
    assert response.status_code == 200


def test_help_route(client):
    response = client.get("/help")
    assert response.status_code == 200


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json["status"] == "ok"


def test_onbekende_tool_geeft_404(client):
    response = client.get("/tools/bestaat-niet")
    assert response.status_code == 404
    assert "oeps" in response.data.decode("utf-8").lower()


def test_offline_banner_in_html(client):
    response = client.get("/")
    html = response.data.decode("utf-8")
    assert "offline-banner" in html
    assert "Geen internetverbinding" in html
