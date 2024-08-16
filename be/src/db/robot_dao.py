from database import Database

class RobotDao:
    def __init__(self, db_config):
        self.db = Database(db_config)

    def fetch_all(self):
        query = "SELECT id, name, robot_type_id, created_at, updated_at FROM robots"
        self.db.cursor.execute(query)
        return self.db.cursor.fetchall()

    def fetch_one(self, robot_id):
        query = "SELECT id, name, robot_type_id, created_at, updated_at FROM robots WHERE id = %s"
        self.db.cursor.execute(query, (robot_id,))
        return self.db.cursor.fetchone()

    def create(self, name, robot_type_id):
        query = "INSERT INTO robots (name, robot_type_id) VALUES (%s, %s) RETURNING id"
        self.db.cursor.execute(query, (name, robot_type_id))
        self.db.connection.commit()
        return self.db.cursor.fetchone()[0]

    def update(self, robot_id, name, robot_type_id):
        query = "UPDATE robots SET name = %s, robot_type_id = %s WHERE id = %s"
        self.db.cursor.execute(query, (name, robot_type_id, robot_id))
        self.db.connection.commit()

        return self.fetch_one(robot_id)

    def delete(self, robot_id):
        query = "DELETE FROM robots WHERE id = %s"
        self.db.cursor.execute(query, (robot_id,))
        self.db.connection.commit()

    def close(self):
        self.db.close()