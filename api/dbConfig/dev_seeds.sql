INSERT INTO users (username, password) 
VALUES
('duckfliesagain', 'tu9ibtoi4tbh2hhuet' ),
('healthman', 'h4hoeuba3r3tbaeu' ),
('notanotherhabittracker', 'ahudnthpdohbapbb243' );

INSERT INTO habits (name) 
VALUES
('drink water'),
('exercise'),
('sleep eight hours');

INSERT INTO user_habits (user_id, habit_id, frequency) 
VALUES
(1,1,5),(1,2,8),(2,1,8),(3,3,8);

INSERT INTO user_habits (user_id, habit_id, frequency) 
VALUES
(1,1,5),(1,2,8),(2,1,8),(3,3,8);

INSERT INTO  habit_entries (user_habit_id, completed)
VALUES
(1,TRUE),(1,TRUE),(1,TRUE),(1,FALSE),(2,TRUE),(2,TRUE),(3,FALSE),(3,FALSE);