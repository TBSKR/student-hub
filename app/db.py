import requests
from flask import current_app


class DatabaseConnection:
    def __init__(self, api_url, api_key, database):
        self.api_url = api_url
        self.api_key = api_key
        self.database = database

    def execute_query(self, query, values=None):
        x = requests.post(
            url=self.api_url + "/db",
            json={"query": query, "values": values, "database": self.database},
            headers={"Authorization": f"Bearer {self.api_key}"},
            timeout=10,
        )
        return x.json()


def execute_query(query, values=None):
    db = DatabaseConnection(
        api_url=current_app.config["API_URL"],
        api_key=current_app.config["API_KEY"],
        database=current_app.config["DATABASE"],
    )
    return db.execute_query(query, values)
