from flask import Blueprint

bp = Blueprint("journey", __name__)

from app.journey import routes
