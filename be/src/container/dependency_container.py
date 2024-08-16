from services import RobotTypeService, RobotService
from db import Database, RobotTypeDao, RobotDao
from config import get_config

class DependencyContainer:
  def __init__(self):
    self.config = None
    self.robot_type_service = None
    self.robot_type_dao = None
    self.robot_service = None
    self.robot_dao = None
    self.database = None

  def get_config(self):
    return _get_cached_or_calculate(
      self.config,
      lambda: get_config()
    )
  
  def get_robot_type_service(self):
    return _get_cached_or_calculate(
      self.robot_type_service,
      lambda: RobotTypeService(self)
    )
  
  def get_robot_type_dao(self):
    return _get_cached_or_calculate(
      self.robot_type_dao,
      lambda: RobotTypeDao(self)
    )
  
  def get_robot_service(self):
    return _get_cached_or_calculate(
      self.robot_service,
      lambda: RobotService(self)
    )
  
  def get_robot_dao(self):
    return _get_cached_or_calculate(
      self.robot_dao,
      lambda: RobotDao(self)
    )
  
  def get_database(self):
    return _get_cached_or_calculate(
      self.database,
      lambda: Database(self._get_db_config())
    )
  
  def _get_db_config(self):
    return self.get_config()['db']
  
def _get_cached_or_calculate(value, func):
  if value is None:
    value = func()
  return value