const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
server.use('/users', usersRoutes);
server.use('/habits', habitsRoutes);

server.get('/', (req, res) => res.send('Welcome to the backend, I hope you are not hackin'));

module.exports = server