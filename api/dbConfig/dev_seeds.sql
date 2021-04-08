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
(1,TRUE, '2021-04-06 08:32:44.561030+0'),
(1,TRUE, '2021-04-06 08:32:44.561031+0'),
(1,TRUE, '2021-04-06 08:32:44.561032+0'),

(1,TRUE, '2021-04-07 08:32:44.561033+0'),
(1,TRUE, '2021-04-07 08:32:44.561034+0'),
(1,TRUE, '2021-04-07 08:32:44.561035+0'),
(1,TRUE, '2021-04-07 08:32:44.561036+0'),
(1,TRUE, '2021-04-07 08:32:44.561037+0'),

(1,TRUE, '2021-04-05 08:32:44.561038+0'),
(1,TRUE, '2021-04-05 08:32:44.561039+0'),
(1,TRUE, '2021-04-05 08:32:44.561040+0'),
(1,TRUE, '2021-04-05 08:32:44.561041+0'),
(1,TRUE, '2021-04-05 08:32:44.561042+0'),

(2,TRUE, '2021-04-06 08:32:44.561043+0'),
(2,TRUE, '2021-04-06 08:32:44.561044+0'),
(2,TRUE, '2021-04-06 08:32:44.561045+0'),
(2,TRUE, '2021-04-06 08:32:44.561046+0'),
(2,TRUE, '2021-04-06 08:32:44.561047+0'),
(2,TRUE, '2021-04-06 08:32:44.561048+0'),
(2,TRUE, '2021-04-06 08:32:44.561049+0'),
(2,TRUE, '2021-04-06 08:32:44.561050+0'),

(2,TRUE, '2021-04-05 08:32:44.561051+0'),
(2,TRUE, '2021-04-05 08:32:44.561052+0'),
(2,TRUE, '2021-04-05 08:32:44.561053+0'),
(2,TRUE, '2021-04-05 08:32:44.561054+0'),
(2,TRUE, '2021-04-05 08:32:44.561055+0'),
(2,TRUE, '2021-04-05 08:32:44.561056+0'),
(2,TRUE, '2021-04-05 08:32:44.561057+0'),
(2,TRUE, '2021-04-05 08:32:44.561058+0');