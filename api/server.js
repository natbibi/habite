const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// basic rate limiting to prevent brute forcing
app.set('trust proxy', 1); // enable in production
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each IP/username combo to 3 requests per windowMs
  skipSuccessfulRequests: true, // dont limit on successful requests
  message: 'too many login attempts',
  keyGenerator: function(req,res){
      return req.ip + req.body.username
  }
});
const totalLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 100, // limit each IP to 100 requests per windowMs
    skipSuccessfulRequests: true, // dont limit on successful requests
    message: 'too many failed requests - try again later',
    keyGenerator: function(req,res){
        return req.ip
    }
  });
// apply to all routes
server.use(totalLimiter)
// apply to only login requests
server.use("/auth/login", limiter);
// reset limit for ip username combo - on captcha completed or some other process
server.post('/reset', (req, res) => {
        res.send(`reset limit for ${req.ip + req.body.username}`)
        limiter.resetKey(req.ip + req.body.username)
    }
);


const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
const authRoutes = require('./routes/auth')
server.use('/users', usersRoutes);
server.use('/habits', habitsRoutes);
server.use('/auth', authRoutes);

server.get('/', (req, res) => res.send('Welcome to the backend, I hope you are not hackin'));

module.exports = server