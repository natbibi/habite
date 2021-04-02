DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(1000) NOT NULL
);
