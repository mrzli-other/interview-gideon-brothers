from app import create_app
from config import get_config

if __name__ == "__main__":
    config = get_config()
    app = create_app(config)
    app.run(debug=True, port=config['port'])