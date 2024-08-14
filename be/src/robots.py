from flask_restful import Resource, reqparse
from flask_apispec import MethodResource, doc, use_kwargs, marshal_with
from marshmallow import Schema, fields

robots = []

class RobotSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    robot_type_id = fields.Int(required=True)

class Robots(MethodResource, Resource):
    @doc(description='Get all robots', tags=['Robots'])
    @marshal_with(RobotSchema(many=True))
    def get(self):
        return robots, 200

    @doc(description='Create a new robot', tags=['Robots'])
    @use_kwargs(RobotSchema, location=('json'))
    @marshal_with(RobotSchema)
    def post(self, **kwargs):
        robot = {
            'id': len(robots) + 1,
            'name': kwargs['name'],
            'robot_type_id': kwargs['robot_type_id']
        }
        robots.append(robot)
        return robot, 201

class Robot(MethodResource, Resource):
    @doc(description='Get a robot by ID', tags=['Robots'])
    @marshal_with(RobotSchema)
    def get(self, id):
        robot = next((robot for robot in robots if robot['id'] == id), None)
        if robot:
            return robot, 200
        return {'message': 'Robot not found'}, 404

    @doc(description='Update a robot by ID', tags=['Robots'])
    @use_kwargs(RobotSchema, location=('json'))
    @marshal_with(RobotSchema)
    def put(self, id, **kwargs):
        robot = next((robot for robot in robots if robot['id'] == id), None)
        if robot:
            robot.update(kwargs)
            return robot, 200
        return {'message': 'Robot not found'}, 404

    @doc(description='Delete a robot by ID', tags=['Robots'])
    def delete(self, id):
        global robots
        robots = [robot for robot in robots if robot['id'] != id]
        return '', 204