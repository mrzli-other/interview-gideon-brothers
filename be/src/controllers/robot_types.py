from flask_restful import Resource
from flask_apispec import MethodResource, doc, use_kwargs, marshal_with
from marshmallow import Schema, fields, validate

class RobotTypeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    dimensions = fields.Str(required=True, validate=validate.Length(min=1, max=4096))
    created_at = fields.Str(dump_only=True)
    updated_at = fields.Str(dump_only=True)

class RobotTypes(MethodResource, Resource):
    def __init__(self, container):
        self.container = container
        self.service = container.get_robot_type_service()

    @doc(description='Get all robot types', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema(many=True))
    def get(self):
        robot_types = self.service.get_all()
        return robot_types, 200

    @doc(description='Create a new robot type', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def post(self, **kwargs):
        robot_type = self.service.create(kwargs)
        return robot_type, 201

class RobotType(MethodResource, Resource):
    def __init__(self, container):
        self.container = container
        self.service = container.get_robot_type_service()

    @doc(description='Get a robot type by ID', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema)
    def get(self, id):
        robot_type = self.service.get_one(id)
        if not robot_type:
            return {'message': 'Robot type not found'}, 404
        return robot_type, 200

    @doc(description='Update a robot type by ID', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def put(self, id, **kwargs):
        robot_type = self.service.update(id, kwargs)
        if not robot_type:
            return {'message': 'Robot type not found'}, 404
        return robot_type, 200

    @doc(description='Delete a robot type by ID', tags=['Robot Types'])
    def delete(self, id):
        self.service.delete(id)
        return '', 204
    
