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

INSERT INTO  habit_entries (user_habit_id, completed, completed_at)
VALUES
(1,TRUE, '2021-04-06 08:32:44.561036+0'),
(1,TRUE, '2021-04-06 08:32:44.561036+0'),
(1,TRUE, '2021-04-06 08:32:44.561036+0'),

(1,TRUE, '2021-04-07 08:32:44.561036+0'),
(1,TRUE, '2021-04-07 08:32:44.561036+0'),
(1,TRUE, '2021-04-07 08:32:44.561036+0'),
(1,TRUE, '2021-04-07 08:32:44.561036+0'),
(1,TRUE, '2021-04-07 08:32:44.561036+0'),

(1,TRUE, '2021-04-05 08:32:44.561036+0'),
(1,TRUE, '2021-04-05 08:32:44.561036+0'),
(1,TRUE, '2021-04-05 08:32:44.561036+0'),
(1,TRUE, '2021-04-05 08:32:44.561036+0'),
(1,TRUE, '2021-04-05 08:32:44.561036+0'),

(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),
(2,TRUE, '2021-04-06 08:32:44.561036+0'),

(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0'),
(2,TRUE, '2021-04-05 08:32:44.561036+0');