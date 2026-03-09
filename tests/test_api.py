def test_tools_lijst(client):
    response = client.get("/api/tools")
    assert response.status_code == 200
    data = response.json
    assert "count" in data
    assert "items" in data
    assert data["count"] > 0
    assert len(data["items"]) == data["count"]


def test_tool_detail(client):
    response = client.get("/api/tools/teams")
    assert response.status_code == 200
    data = response.json
    assert data["id"] == "teams"
    assert data["name"] == "Microsoft Teams"


def test_tool_niet_gevonden(client):
    response = client.get("/api/tools/bestaat-niet")
    assert response.status_code == 404
    assert response.json["error"] == "Tool niet gevonden"


def test_tool_categorieen(client):
    response = client.get("/api/tool-categories")
    assert response.status_code == 200
    data = response.json
    assert "samenwerken" in data
    assert "dev" in data
