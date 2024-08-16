import psycopg

class Database:
    def __init__(self, config):
        self.connection = psycopg.connect(
            dbname=config.name,
            user=config.user,
            password=config.password,
            host=config.host,
            port=config.port
        )
        self.cursor = self.connection.cursor()

    def close(self):
        self.cursor.close()
        self.connection.close()