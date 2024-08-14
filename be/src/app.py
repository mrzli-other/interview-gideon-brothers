from flask import Flask, Blueprint
from flask_restful import Api
from flask_apispec import FlaskApiSpec
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

    return app