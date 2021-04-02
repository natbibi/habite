// Modules
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// Models
const User = require('../models/user');

async function register (req,res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashedPassword});
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login (req,res) {
    try {
        const user = await User.find(req.body.username)
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            const payload = { username: user.username}
            const sendToken = (err, token) => {
                if(err){ throw new Error(err) }
                res.status(200).json({
                    success: true,
                    token: token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 900 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({err});
    }
}

function signPayload(payload) {
    
}

module.exports = { register, login };