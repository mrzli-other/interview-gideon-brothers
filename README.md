# Robot Manager

This project is a simple robot manager that implements CRUD operations for robots and robot types.

## Setup (Local)

I did not test the installation process, and it is possible that not all dependencies are listed. If you encounter any issues, please let me know.

### Installation

To run the project, you need to have the following installed:

- [PostgreSQL](https://www.postgresql.org/download/) database. I am using version 16.4.
- [Python](https://www.python.org/downloads/) for the backend. I am using version 3.12.
- [Node.js](https://nodejs.org/en/download/) for the frontend. I am using Node.js version 22.

### Setup Database

Create a new database on your PostgreSQL server, manually, using your database admin tool or by running the following SQL command:

```sql
CREATE DATABASE robot_manager;
```

Set up the database by running the query you can find in the `docker/data/query.sql` file.

You can omit the inserts if you want to start with an empty database.

### Setup Backend

Install the required Python dependencies by navigating to the `be` folder and running following command:

```bash
pip install -r requirements.txt
```

You also need to set up the environment variables. Copy `.env.example` to `.env` and set database access variables based on your database configuration.

### Setup Frontend

Make sure the frontend is pointing to the correct backend URL. You can specify the backend URL in the `src/config/app.config.ts` file. You will need to change the port if you used a port other than 5000 for the backend.

Install the required node dependencies by navigating to the `fe` folder and running the following command:

```bash
npm install
```

## Running (Local)

Make sure your database is running.

To start the backend, run the following command in the `be` folder:

```bash
python src/run.py
```

To start the frontend, run the following command in the `fe` folder:

```bash
npm run start
```

Your application should now be available at `http://localhost:4200`.
API docs will be available at `http://localhost:5000/api/swagger`.

## Running (Docker)

To run the application using Docker:

- Navigate to `docker/compose` folder.
- Execute `./start.sh` to start the application.
- If you make changes to the code, you can rebuild the frontend and backend images by executing `./build.sh`. You can then start the application again by executing `./start.sh` again.
- Application will be available at `http://localhost:4280`. If this is your first time running the application, you will need to set up the database (see below).
- API docs will be available at `http://localhost:5006/api/swagger`.

### Setup Database

Database needs to be set up when the application is first run. This is not done automatically.

Database server can be accessed in one of two ways, described in the next two sections.

After you have connected to the database server, simply run the script in file `docker/data/query.sql` on the `robot_manager` database.

#### Accessing Database From the Host System

You can access the database from your host system with the following credentials:

- Host: `localhost`
- Port: `15432`
- Username: `user`
- Password: `pass`

#### Accessing Database via Dockerized Admin Interface

Admin interface is available using your browser at `http://localhost:7006`.

You can log in to the admin interface with:

- Email: `example@email.com`
- Password: `pass`

After logging in, you can access the database with the following credentials:

- Host: `db` (name of the service in the docker-compose file)
- Port: `5432` (port inside `robot-manager` network)
- Username: `user`
- Password: `pass`

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

- `GET /api/robot_types` - Get all robot types.
- `POST /api/robot_types` - Create a new robot type.
- `GET /api/robot_types/<int:id>` - Get a robot type by ID.
- `PUT /api/robot_types/<int:id>` - Update a robot type by ID.
- `DELETE /api/robot_types/<int:id>` - Delete a robot type by ID.

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
