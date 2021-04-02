DROP TABLE IF EXISTS habits;
CREATE TABLE habits (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);

DROP TABLE IF EXISTS user_habits;
CREATE TABLE user_habits (
    id serial PRIMARY KEY,
    user_id int references users(id),
    habit_id int references habits(id)
);

DROP TABLE IF EXISTS habit_entry;
CREATE TABLE habit_entry (
    id serial PRIMARY KEY,
    user_id int references users(id),
    user_habit_id int references user_habits(id),
    completed varchar(100)
);