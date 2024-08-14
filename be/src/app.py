from flask import Flask, Blueprint, jsonify
from flask_restful import Api
from flask_apispec import FlaskApiSpec
from flask_swagger_ui import get_swaggerui_blueprint
from robot_types import RobotTypes, RobotType
from robots import Robots, Robot

def create_app():
    app = Flask(__name__)

    api_bp = Blueprint('api', __name__, url_prefix='/api')
    api = Api(api_bp)

    # Routes for robot types
    api.add_resource(RobotTypes, '/robot_types', endpoint='robot_types')
    api.add_resource(RobotType, '/robot_types/<int:id>', endpoint='robot_type')

    # Routes for robots
    api.add_resource(Robots, '/robots', endpoint='robots')
    api.add_resource(Robot, '/robots/<int:id>', endpoint='robot')

    # Register blueprint
    app.register_blueprint(api_bp)

    # Setup Flask-apispec
    docs = FlaskApiSpec(app)

    # Register resources with Flask-apispec
    docs.register(RobotTypes, blueprint='api', endpoint='robot_types')
    docs.register(RobotType, blueprint='api', endpoint='robot_type')
    docs.register(Robots, blueprint='api', endpoint='robots')
    docs.register(Robot, blueprint='api', endpoint='robot')

    # Serve the Swagger JSON
    @app.route('/swagger.json')
    def swagger_json():
        return jsonify(docs.spec.to_dict())

    # Setup Swagger UI
    _setup_swagger(app)

    return app

def _setup_swagger(app):
    SWAGGER_URL = '/api/swagger'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Robot Manager"})
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)