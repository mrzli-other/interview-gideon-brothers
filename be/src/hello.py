from flask import Flask
from dotenv import dotenv_values
import psycopg

app = Flask(__name__)

def get_config():
    env = {
        **dotenv_values(".env"),
    }

    return {
        'env': env,
    }

def get_db_connection():
    config = get_config()['env']
    conn = psycopg.connect(
        dbname=config['DB_NAME'],
        user=config['DB_USER'],
        password=config['DB_PASSWORD'],
        host=config['DB_HOST'],
        port=config['DB_PORT']
    )
    return conn

@app.route("/")
def hello_world():
    print(get_config())

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM people")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    print(rows)  # Print the rows to the console for debugging

    return "<p>Hello, World!</p>"
