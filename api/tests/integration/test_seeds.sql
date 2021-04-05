TRUNCATE TABLE users, habits, user_habits, habit_entries RESTART IDENTITY CASCADE;

INSERT INTO users (username, password) 
VALUES
('user1', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('user2', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('user3', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' );

INSERT INTO habits (name) 
VALUES
('habit1'),
('habit2'),
('habit3');

INSERT INTO user_habits (user_id, habit_id, frequency) 
VALUES
(1,1,5),(1,2,8),(2,1,8),(3,3,8);

INSERT INTO  habit_entries (user_habit_id, completed)
VALUES
(1,TRUE),(1,TRUE),(1,TRUE),(1,FALSE),(2,TRUE),(2,TRUE),(3,FALSE),(3,FALSE);