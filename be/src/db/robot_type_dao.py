from database import Database

class RobotTypeDao:
    def __init__(self, db_config):
        self.db = Database(db_config)

    def fetch_all(self):
        query = "SELECT id, name, dimensions, created_at, updated_at FROM robot_types"
        self.db.cursor.execute(query)
        return self.db.cursor.fetchall()

    def fetch_one(self, robot_type_id):
        query = "SELECT id, name, dimensions, created_at, updated_at FROM robot_types WHERE id = %s"
        self.db.cursor.execute(query, (robot_type_id,))
        return self.db.cursor.fetchone()

    def create(self, name, dimensions):
        query = "INSERT INTO robot_types (name, dimensions) VALUES (%s, %s) RETURNING id"
        self.db.cursor.execute(query, (name, dimensions))
        self.db.connection.commit()
        return self.db.cursor.fetchone()[0]

    def update(self, robot_type_id, name, dimensions):
        query = "UPDATE robot_types SET name = %s, dimensions = %s WHERE id = %s"
        self.db.cursor.execute(query, (name, dimensions, robot_type_id))
        self.db.connection.commit()

        return self.fetch_one(robot_type_id)

    def delete(self, robot_type_id):
        # Delete all robots of this type first
        delete_robots_query = "DELETE FROM robots WHERE robot_type_id = %s"
        self.db.cursor.execute(delete_robots_query, (robot_type_id,))
        
        # Delete the robot type
        delete_robot_type_query = "DELETE FROM robot_types WHERE id = %s"
        self.db.cursor.execute(delete_robot_type_query, (robot_type_id,))
        self.db.connection.commit()

    def close(self):
        self.db.close()