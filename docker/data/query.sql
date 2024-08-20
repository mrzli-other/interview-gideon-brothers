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