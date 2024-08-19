# Robot Manager

This project is a simple robot manager that implemnents CRUD operations for robots and robot types.

## Usage

I did not test the installation process, and it is possible that not all dependencies are listed. If you encounter any issues, please let me know.

### Prerequisites

#### Installation

To be able to run the project you need to have the following installed:

- [PostgreSQL](https://www.postgresql.org/download/) database. I am using version 16.4
- [Python](https://www.python.org/downloads/) for backend. I am using version 3.11.
- [Node.js](https://nodejs.org/en/download/) for frontend. I am using node 22.

#### Setup

##### Database

Create a new database on your PostgreSQL server, manually using your database admin tool or by running the following SQL command:

```sql
CREATE DATABASE robot_manager;
```

Set up the database by running the following query:

```sql
CREATE TABLE IF NOT EXISTS robot_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    dimensions POLYGON NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS robot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    robot_type_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (robot_type_id) REFERENCES robot_type(id)
);

TRUNCATE TABLE robot RESTART IDENTITY CASCADE;
TRUNCATE TABLE robot_type RESTART IDENTITY CASCADE;

INSERT INTO robot_type (name, dimensions) VALUES
('Type A', '((0.15,0.2),(0.85,0.2),(0.85,0.8),(0.15,0.8))'),
('Type B', '((0.2,0.3),(0.7,0.3),(0.7,0.7),(0.2,0.7))'),
('Type C', '((0.1,0.1),(0.4,0.2),(0.5,0.5),(0.2,0.4))'),
('Type D', '((0.3,0.3),(0.6,0.3),(0.6,0.6),(0.3,0.6))'),
('Type E', '((0.25,0.2),(0.75,0.2),(0.75,0.75),(0.25,0.75))'),
('Type F', '((0.2,0.2),(0.8,0.2),(0.8,0.8),(0.2,0.8))');

INSERT INTO robot (name, robot_type_id) VALUES
('Robot 1', 1),
('Robot 2', 2),
('Robot 3', 3),
('Robot 4', 1),
('Robot 5', 2),
('Robot 6', 3),
('Robot 7', 4),
('Robot 8', 5),
('Robot 9', 6),
('Robot 10', 1);
```

You can omit the seeding queries if you want to start with an empty database.

#### Backend

Install the required python dependencies by navigating to the `be` folder and running following command:

```bash
pip install -r requirements.txt
```

You also need to set up the environment variables. Copy `.env.example` to `.env` and set database access variables based on your database configuration.

#### Frontend

Make sure the frontend is pointing to the correct backend URL. You can specify the backend URL in the `src/config/app.config.ts` file. You will need to change the port if you used a port other than 5000 for the backend.

Install the required node dependencies by navigating to the `fe` folder and running the following command:

```bash
npm install
```

### Running Locally

Make sure your database is running.

To start the backend, run the following command in the `be` folder:

```bash
python src/run.py
```

To start the frontend, run the following command in the `fe` folder:

```bash
npm run start
```

## Application Architecture

Unsurprisingly, the application is vertically separated into the database, backend, and frontend.

### Database

The database is a PostgreSQL database with two tables: `robot` and `robot_type`. `robot` has a foreign key to `robot_type` - for each `robot_type`, there can be multiple `robots` of that type.

#### `robot_type`

- `id` - Primary key.
- `name` - Name of the robot type.
- `dimensions` - Polygon representing the dimensions of the robot type. Just a list of points.
- `created_at` - Timestamp of creation.
- `updated_at` - Timestamp of last update.

#### `robot`

- `id` - Primary key.
- `name` - Name of the robot.
- `robot_type_id` - Foreign key to `robot_type`.
- `created_at` - Timestamp of creation.
- `updated_at` - Timestamp of last update.

### Backend

Backend is located in the `be` folder.

By default, the application will run on port `5000`, but you can change this in the `.env` file.

The entry point to the backend is `src/run.py`. The backend is a Flask app that provides a REST API for CRUD operations for robots and robot types.

Once you start the backend, the Swagger UI will be available at `http://localhost:<port>/api/swagger`.

#### Code Structure

Besides the `run.py` entry point, the `src` root also contains the `app.py` file, which:

- Initializes and configures the Flask app.
- Registers the API resources.
- Sets up Swagger documentation.
- Sets up a global error handler.

`src` further has some support code located in the following folders:

- `config` - Contains the configuration for the app. Currently, it only contains variables read from the environment.
- `container` - Implements a crude dependency container.
- `util` - Contains some simple utility functions.

The meat of the backend is located in the `controllers`, `services` and `db` folders, which implement three layers of the application:

##### Controllers

Controllers are responsible for handling the HTTP requests and responses. They are actually implemented as Resource classes for `robot-types` and `robots`.

The API is as follows:

**Robot type:**

- `GET /api/robot-types` - Get all robot types.
- `POST /api/robot-types` - Create a new robot type.
- `GET /api/robot-types/<int:id>` - Get a robot type by ID.
- `PUT /api/robot-types/<int:id>` - Update a robot type by ID.
- `DELETE /api/robot-types/<int:id>` - Delete a robot type by ID.

**Robot:**

- `GET /api/robots` - Get all robots.
- `POST /api/robots` - Create a new robot.
- `GET /api/robots/<int:id>` - Get a robot by ID.
- `PUT /api/robots/<int:id>` - Update a robot by ID.
- `DELETE /api/robots/<int:id>` - Delete a robot by ID.

##### Services

Services mostly does the translation between the controllers and the database data structures. In this app, they don't have much business logic other than that.

##### Db

The `db` folder contains the code for interacting with the database. It is pretty straightforward, there is not much to say about it.

### Frontend

Frontend is located in the `fe` folder.

It is an Angular app that provides a simple UI for managing robots and robot types.

#### Development Tools

To help with development, prettier is used `prettier` for easier code formatting.

This project also makes use of `tailwindcss` for styling.

##### What is Missing?

Linter is not set up, but `eslint` should definitely in an actual project.

Also, `storybook` would be useful for developing UI components.

#### Code Structure

Code is located in the `src` folder.

At the high level, a lot of the structure is self-explanatory.

The entry point to the app is the `main.ts` file.

##### Configuration

Global app configuration is implemented inside the `config` folder. This includes setting up some global variables (currently this is only the backend URL), and general Angular app configuration (setting up providers).

##### Routing

Located in `routing` folder.

The app has just a few routes:

- `/dashboard` - This is main page of the app. Does not contain much. `/` also redirects here.
- `/robot-types` - List of robot types.
- `/robot-types/create` - Create a new robot type.
- `/robot-types/update/:id` - Edit a robot type.
- `/robots` - List of robots.
- `/robots/create` - Create a new robot.
- `/robots/update/:id` - Edit a robot.

##### Services

The `services` folder contains services for interacting with the backend API. These also facilitate conversion between so-called 'data transfer objects' (DTOs) and application data structures.

It is also meant to contain some UI services. Currently, only `snackbar.service` is there. This is a simple wrapper around Angular Material's snackbar, for easier and more consistent use.

##### Store

The `store` folder contains the global state management code and effects.

The store is implemented using `ngrx`. Like the rest of the app, it is separated into the `robot-type` and `robot` features.

Communication of components with the backend API goes through the `@ngrx/effects` implemented here.

##### Components

This is the main part of the application.

All of the components are implemented in the `components` folder.

The code organization here is straightforward. There are separate folders for each of the main pages (`dashboard`, `robot-types`, `robots`, and the fallback `not-found` page).

The `shared` folder contains some shared components, like custom (or just differently styled) form inputs.

The `robot-type` and `robot` folders are very similar. They each have a list, create, and update components on their separate sub-routes.

##### Support

The `types` and `util` folders contain some general types and utility functions used by the rest of the frontend app.