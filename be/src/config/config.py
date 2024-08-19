from dotenv import dotenv_values

def get_config():
    env = _get_env()

    port = env.get('PORT', 5000)
    db = _get_db_config(env)

    return {
        'port': port,
        'db': db,
    }

def init_config():
    global config
    config = get_config()

def _get_db_config(env):
    return {
        'name': env['DB_NAME'],
        'user': env['DB_USER'],
        'password': env['DB_PASSWORD'],
        'host': env['DB_HOST'],
        'port': env['DB_PORT'],
    }

def _get_env():
    return dotenv_values(".env")
