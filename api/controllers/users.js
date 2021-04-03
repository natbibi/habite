const User = require('../models/User');

const express = require('express');
const router = express.Router();

async function show(req, res){
    try {
        //check if valid jwt is for the requested user
        if (res.locals.user !== req.params.username) throw Error
        const user = await User.find(req.params.username);
        res.json(user)
    } catch (err) {
        res.status(403).send('access denied')
    }
}

module.exports = { show } 