def test_tools_pagina_laadt(client):
    response = client.get("/tools")
    assert response.status_code == 200


def test_zoekbalk_aanwezig(client):
    response = client.get("/tools")
    html = response.data.decode()
    assert 'id="zoek-input"' in html


def test_snelknoppen_aanwezig(client):
    response = client.get("/tools")
    html = response.data.decode()
    assert "Brightspace" in html
    assert "Teams" in html
    assert "Rooster" in html
    assert "OneDrive" in html
    assert "SPSS" in html


def test_lege_state_aanwezig(client):
    response = client.get("/tools")
    html = response.data.decode()
    assert 'id="geen-resultaten"' in html


def test_zoeken_js_geladen(client):
    response = client.get("/tools")
    html = response.data.decode()
    assert "zoeken.js" in html


def test_tool_cards_hebben_data_attributen(client):
    response = client.get("/tools")
    html = response.data.decode()
    assert "data-naam=" in html
    assert "data-categorie=" in html
