from os import environ
from dotenv import dotenv_values

def get_config():
    env = _get_env()

    host = env.get('HOST', 'localhost')
    port = env.get('PORT', 5000)
    db = _get_db_config(env)

    return {
        'host': host,
        'port': port,
        'db': db,
    }

def _get_db_config(env):
    return {
        'name': env['DB_NAME'],
        'user': env['DB_USER'],
        'password': env['DB_PASSWORD'],
        'host': env['DB_HOST'],
        'port': env['DB_PORT'],
    }

def _get_env():
    return {
        **dotenv_values(".env"),
        **environ,
    }
