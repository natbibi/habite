INSERT INTO users (username, password) 
VALUES
('duckfliesagain', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('admin', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' ),
('notanotherhabittracker', '$2b$10$s7fRx4nL9T1oO2SHyN4jqOYu70lo3wJrqSNuBnZ2zwYYQ3YJ1bSK.' );

INSERT INTO habits (name) 
VALUES
('💧 drink water'),
('🏃🏻‍♀️ workout'),
('🍳 eat breakfast'),
('🥗 eat vegetables'),
('🧘🏻‍♀️ meditate');

INSERT INTO user_habits (user_id, habit_id, frequency, created_at) 
VALUES
(1,1,3, current_timestamp - INTERVAL '3 day'),
(1,2,4, current_timestamp - INTERVAL '1 day'),
(2,1,2, current_timestamp - INTERVAL '2 day'),
(2,3,3, current_timestamp);

INSERT INTO  habit_entries (user_habit_id, completed, completed_at)
VALUES

(1,TRUE, current_timestamp),

(1,TRUE, current_timestamp - INTERVAL '1 day'),
(1,TRUE, current_timestamp - INTERVAL '1 day'),
(1,TRUE, current_timestamp - INTERVAL '1 day'),

(1,TRUE, current_timestamp - INTERVAL '2 day'),
(1,TRUE, current_timestamp - INTERVAL '2 day'),
(1,FALSE, current_timestamp - INTERVAL '2 day'),

(1,TRUE, current_timestamp - INTERVAL '3 day'),
(1,FALSE, current_timestamp - INTERVAL '3 day'),
(1,FALSE, current_timestamp - INTERVAL '3 day'),

(2,TRUE, current_timestamp),
(2,TRUE, current_timestamp),

(2,TRUE, current_timestamp - INTERVAL '1 day'),
(2,TRUE, current_timestamp - INTERVAL '1 day'),
(2,TRUE, current_timestamp - INTERVAL '1 day'),
(2,TRUE, current_timestamp - INTERVAL '1 day'),

(3,TRUE, current_timestamp),

(3,TRUE, current_timestamp - INTERVAL '1 day'),
(3,TRUE, current_timestamp - INTERVAL '1 day'),

(3,FALSE, current_timestamp - INTERVAL '2 day'),
(3,FALSE, current_timestamp - INTERVAL '2 day');
