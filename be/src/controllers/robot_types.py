from flask_restful import Resource
from flask_apispec import MethodResource, doc, use_kwargs, marshal_with
from marshmallow import Schema, fields, validate
from db import RobotTypeDao

robot_types = [
    {
        'id': 1,
        'name': 'Robot 1',
        'dimensions': 'Robot 1 dimensions',
    },
    {
        'id': 2,
        'name': 'Robot 2',
        'dimensions': 'Robot 2 dimensions',
    },
    {
        'id': 3,
        'name': 'Robot 3',
        'dimensions': 'Robot 3 dimensions',
    },
    {
        'id': 4,
        'name': 'Robot 4',
        'dimensions': 'Robot 4 dimensions',
    },
    {
        'id': 5,
        'name': 'Robot 5',
        'dimensions': 'Robot 5 dimensions',
    },
]

class RobotTypeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    dimensions = fields.Str(required=True, validate=validate.Length(min=1, max=4096))

def get_next_id(items, key):
    if items:
        return max(item[key] for item in items) + 1
    return 1

class RobotTypes(MethodResource, Resource):
    def __init__(self, config):
        self.config = config
        self.dao = RobotTypeDao(config['db'])

    @doc(description='Get all robot types', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema(many=True))
    def get(self):
        print(self.config)
        return robot_types, 200

    @doc(description='Create a new robot type', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def post(self, **kwargs):
        robot_type = {
            'id': get_next_id(robot_types, 'id'),
            'name': kwargs['name'],
            'dimensions': kwargs['dimensions']
        }
        robot_types.append(robot_type)
        return robot_type, 201

class RobotType(MethodResource, Resource):
    def __init__(self, config):
        self.config = config

    @doc(description='Get a robot type by ID', tags=['Robot Types'])
    @marshal_with(RobotTypeSchema)
    def get(self, id):
        robot_type = next((robot_type for robot_type in robot_types if robot_type['id'] == id), None)
        if robot_type:
            return robot_type, 200
        return {'message': 'Robot type not found'}, 404

    @doc(description='Update a robot type by ID', tags=['Robot Types'])
    @use_kwargs(RobotTypeSchema, location=('json'))
    @marshal_with(RobotTypeSchema)
    def put(self, id, **kwargs):
        robot_type = next((robot_type for robot_type in robot_types if robot_type['id'] == id), None)
        if robot_type:
            robot_type.update(kwargs)
            return robot_type, 200
        return {'message': 'Robot type not found'}, 404

    @doc(description='Delete a robot type by ID', tags=['Robot Types'])
    def delete(self, id):
        global robot_types
        robot_types = [robot_type for robot_type in robot_types if robot_type['id'] != id]
        return '', 204