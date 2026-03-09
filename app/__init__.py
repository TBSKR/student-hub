import os

from flask import Flask

from app.config import config


def create_app(config_name=None):
    app = Flask(__name__)

    env = config_name or os.environ.get('FLASK_ENV', 'development')
    app.config.from_object(config[env])

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.tools import bp as tools_bp
    app.register_blueprint(tools_bp)

    from app.journey import bp as journey_bp
    app.register_blueprint(journey_bp)

    from app.help import bp as help_bp
    app.register_blueprint(help_bp)

    from app.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app
