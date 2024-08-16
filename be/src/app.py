from flask import Flask, Blueprint, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_apispec import FlaskApiSpec
from flask_swagger_ui import get_swaggerui_blueprint
from container import DependencyContainer
from controllers import RobotTypes, RobotType, Robots, Robot

def create_app():
    app = Flask(__name__)
    CORS(app)

    resource_args = { 'container': DependencyContainer() }

    # setup routes
    api_bp = Blueprint('api', __name__, url_prefix='/api')
    api = Api(api_bp)

    api.add_resource(
        RobotTypes,
        '/robot_types',
        endpoint='robot_types',
        resource_class_kwargs=resource_args
    )
    api.add_resource(
        RobotType,
        '/robot_types/<int:id>',
        endpoint='robot_type',
        resource_class_kwargs=resource_args
    )

    api.add_resource(
        Robots,
        '/robots',
        endpoint='robots',
        resource_class_kwargs=resource_args
    )
    api.add_resource(
        Robot,
        '/robots/<int:id>',
        endpoint='robot',
        resource_class_kwargs=resource_args
    )

    app.register_blueprint(api_bp)

    app.register_error_handler(Exception, _handle_error)

    # setup swagger
    docs = FlaskApiSpec(app)

    docs.register(
        RobotTypes,
        blueprint='api',
        endpoint='robot_types',
        resource_class_kwargs=resource_args
    )
    docs.register(
        RobotType,
        blueprint='api',
        endpoint='robot_type',
        resource_class_kwargs=resource_args
    )
    docs.register(
        Robots,
        blueprint='api',
        endpoint='robots',
        resource_class_kwargs=resource_args
    )
    docs.register(
        Robot,
        blueprint='api',
        endpoint='robot',
        resource_class_kwargs=resource_args
    )

    @app.route('/swagger.json')
    def swagger_json():
        return jsonify(docs.spec.to_dict())

    _setup_swagger(app)

    return app

def _setup_swagger(app):
    SWAGGER_URL = '/api/swagger'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Robot Manager"})
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

def _handle_error(error):
    response = {
        "message": str(error),
        "type": error.__class__.__name__
    }
    return jsonify(response), 500