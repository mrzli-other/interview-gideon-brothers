from flask_restful import Resource
from flask_apispec import MethodResource, doc, use_kwargs, marshal_with
from marshmallow import Schema, fields, validate

class RobotSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    robot_type_id = fields.Int(required=True)
    created_at = fields.Str(dump_only=True)
    updated_at = fields.Str(dump_only=True)

class Robots(MethodResource, Resource):
    def __init__(self, container):
        self.container = container
        self.service = container.get_robot_service()

    @doc(description='Get all robots', tags=['Robots'])
    @marshal_with(RobotSchema(many=True))
    def get(self):
        robots = self.service.get_all()
        return robots, 200

    @doc(description='Create a new robot', tags=['Robots'])
    @use_kwargs(RobotSchema, location=('json'))
    @marshal_with(RobotSchema)
    def post(self, **kwargs):
        robot = self.service.create(kwargs)
        return robot, 201

class Robot(MethodResource, Resource):
    def __init__(self, container):
        self.container = container
        self.service = container.get_robot_service()

    @doc(description='Get a robot by ID', tags=['Robots'])
    @marshal_with(RobotSchema)
    def get(self, id):
        robot = self.service.get_one(id)
        if not robot:
            return {'message': 'Robot not found'}, 404
        return robot, 200

    @doc(description='Update a robot by ID', tags=['Robots'])
    @use_kwargs(RobotSchema, location=('json'))
    @marshal_with(RobotSchema)
    def put(self, id, **kwargs):
        robot = self.service.update(id, kwargs)
        if not robot:
            return {'message': 'Robot not found'}, 404
        return robot, 200

    @doc(description='Delete a robot by ID', tags=['Robots'])
    def delete(self, id):
        self.service.delete(id)
        return '', 204