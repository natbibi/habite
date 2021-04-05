DROP TABLE IF EXISTS habits;
CREATE TABLE habits (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);

DROP TABLE IF EXISTS user_habits;
CREATE TABLE user_habits (
    id serial PRIMARY KEY,
    user_id int references users(id),
    habit_id int references habits(id),
    frequency int
);

DROP TABLE IF EXISTS habit_entries;
CREATE TABLE habit_entries (
    id serial PRIMARY KEY,
    user_habit_id int references user_habits(id),
    completed boolean
);