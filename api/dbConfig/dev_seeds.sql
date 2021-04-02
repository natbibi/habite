INSERT INTO users (username, password) 
VALUES
('DouglasAdams', 'hefuyew87fy79'),
('LeoTolstoy', 'hefuyew87fy79'),
('PatriciaFinney', 'hefuyew87fy79');

INSERT INTO habits (name) 
VALUES
('drink water'),
('exercise'),
('sleep eight hours');

INSERT INTO user_habits (user_id, habit_id) 
VALUES
(1,1),(1,2),(2,1),(3,3);