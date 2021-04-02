DROP TABLE IF EXISTS habits;
CREATE TABLE habits (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);

DROP TABLE IF EXISTS user_habits;
CREATE TABLE user_habits (
    id serial PRIMARY KEY,
    user_id int,
    habit_id int
);

DROP TABLE IF EXISTS habit_entry;
CREATE TABLE habit_entry (
    id serial PRIMARY KEY,
    user_id int,
    habit_id int,
    completed varchar(100)
);