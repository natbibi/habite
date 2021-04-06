INSERT INTO users (username, password) 
VALUES
('duckfliesagain', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('admin', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('notanotherhabittracker', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' );

INSERT INTO habits (name) 
VALUES
('drink water'),
('workout'),
('read book'),
('eat breakfast'),
('eat vegetables'),
('meditate'),
('stretch'),
('study'),
('nap'),
('call parents'),
('floss'),
('write in journal'),
('sleep eight hours');

INSERT INTO user_habits (user_id, habit_id, frequency) 
VALUES
(1,1,5),(1,2,8),(2,1,8),(3,3,8);

INSERT INTO  habit_entries (user_habit_id, completed)
VALUES
(1,TRUE),(1,TRUE),(1,TRUE),(1,FALSE),(2,TRUE),(2,TRUE),(3,FALSE),(3,FALSE);