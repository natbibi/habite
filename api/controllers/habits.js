const Habit = require('../models/Habit');

const express = require('express');
const router = express.Router();


async function  show(req,res) {
  try {
      const habit = await Habit.find(req.params.habitName);
      res.json(habit)
  } catch (err) {
      res.status(403).send({err: 'Invalid token'})
  }

}