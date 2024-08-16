from util.date import to_iso_utc
from util.transform import transform_if_exists

class RobotTypeService:
  def __init__(self, container):
    self.container = container
    self.dao = container.get_robot_type_dao()

  def get_all(self):
    data = self.dao.fetch_all()
    return [_tuple_to_dict(item) for item in data]
  
  def create(self, data):
    data = self.dao.create(data['name'], data['dimensions'])
    return _tuple_to_dict(data)
  
  def get_one(self, id):
    data = self.dao.fetch_one(id)
    return transform_if_exists(data, _tuple_to_dict)
  
  def update(self, id, data):
    data = self.dao.update(id, data['name'], data['dimensions'])
    return transform_if_exists(data, _tuple_to_dict)
  
  def delete(self, id):
    self.dao.delete(id)

def _tuple_to_dict(t):
    return {
        'id': t[0],
        'name': t[1],
        'dimensions': t[2],
        'created_at': to_iso_utc(t[3]),
        'updated_at': to_iso_utc(t[4]),
    }
