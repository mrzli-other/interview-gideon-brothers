from .database import Database

class RobotDao:
    def __init__(self, container):
        self.db = container.get_database()

    def fetch_all(self):
        query = "SELECT id, name, robot_type_id, created_at, updated_at FROM robot"
        self.db.cursor.execute(query)
        return self.db.cursor.fetchall()

    def fetch_one(self, robot_id):
        query = "SELECT id, name, robot_type_id, created_at, updated_at FROM robot WHERE id = %s"
        self.db.cursor.execute(query, (robot_id,))
        return self.db.cursor.fetchone()

    def create(self, name, robot_type_id):
        query = "INSERT INTO robot (name, robot_type_id) VALUES (%s, %s) RETURNING id"
        self.db.cursor.execute(query, (name, robot_type_id))
        self.db.connection.commit()
        robot_id = self.db.cursor.fetchone()[0]

        return self.fetch_one(robot_id)

    def update(self, robot_id, name, robot_type_id):
        query = "UPDATE robot SET name = %s, robot_type_id = %s, updated_at = NOW() WHERE id = %s"
        self.db.cursor.execute(query, (name, robot_type_id, robot_id))
        self.db.connection.commit()

        return self.fetch_one(robot_id)

    def delete(self, robot_id):
        query = "DELETE FROM robot WHERE id = %s"
        self.db.cursor.execute(query, (robot_id,))
        self.db.connection.commit()