from flask import jsonify
from flask_restful import Resource
from flask_apispec import MethodResource, doc, use_kwargs, marshal_with
from marshmallow import Schema, fields, validate
from db import RobotTypeDao

class RobotTypeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    dimensions = fields.Str(required=True, validate=validate.Length(min=1, max=4096))
    created_at = fields.Str(dump_only=True)
    updated_at = fields.Str(dump_only=True)

class RobotTypes(MethodResource, Resource):
    def __init__(self, config):
        self.config = config
        self.dao = RobotTypeDao(config['db'])

    @doc(description='Get all robot types', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema(many=True))
    def get(self):
        data = self.dao.fetch_all()
        robot_types = [_tuple_to_dict(item) for item in data]
        schema = RobotTypeSchema(many=True)
        result = schema.dump(robot_types)
        print(result)
        return result, 200

    @doc(description='Create a new robot type', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def post(self, **kwargs):
        robot_type = self.dao.create(kwargs['name'], kwargs['dimensions'])
        return robot_type, 201

class RobotType(MethodResource, Resource):
    def __init__(self, config):
        self.config = config
        self.dao = RobotTypeDao(config['db'])

    @doc(description='Get a robot type by ID', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema)
    def get(self, id):
        robot_type = self.dao.fetch_one(id)
        if not robot_type:
            return {'message': 'Robot type not found'}, 404
        return robot_type, 200

    @doc(description='Update a robot type by ID', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def put(self, id, **kwargs):
        robot_type = self.dao.update(id, kwargs['name'], kwargs['dimensions'])
        if not robot_type:
            return {'message': 'Robot type not found'}, 404
        return robot_type, 200

    @doc(description='Delete a robot type by ID', tags=['Robot Types'])
    def delete(self, id):
        self.dao.delete(id)
        return '', 204
    
def _tuple_to_dict(t):
    return {
        'id': t[0],
        'name': t[1],
        'dimensions': t[2],
        'created_at': t[3].isoformat(),
        'updated_at': t[4].isoformat(),
    }