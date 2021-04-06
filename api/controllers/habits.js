const { Habit, UserHabit} = require('../models/Habit');

const express = require('express');
const router = express.Router();

async function showAllHabits(req, res){
  try {
      const habits = await Habit.all;
      res.json(habits)
  } catch (err) {
      res.status(403).send({err: err})
  }
}

async function createHabit(req, res){
  try {
      const habit = await Habit.create({...req.body});
      res.json(habit)
  } catch (err) {
      res.status(403).send({err: err})
  }
}

async function createUserHabit(req, res){
  try {
      //check if valid jwt is for the requested user
      // if (res.locals.user !== req.params.username) throw err
      const userHabit = await UserHabit.createUserHabit({...req.body});
      res.json(userHabit)
  } catch (err) {
      res.status(403).send({err: err})
  }
}

async function createHabitEntry(req, res){
  try {
      //check if valid jwt is for the requested user
      // if (res.locals.user !== req.params.username) throw err
      const habitEntry = await UserHabit.createHabitEntry({...req.body});
      res.json(habitEntry)
  } catch (err) {
      res.status(403).send({err: err})
  }
}

async function getAllUserHabits(req, res){
  try {
      //check if valid jwt is for the requested user
      // if (res.locals.user !== req.params.username) throw err
      const userHabits = await UserHabit.all
      res.json(userHabits)
  } catch (err) {
      res.status(403).send({err: err})
  }
}

module.exports = { showAllHabits, createHabit, createUserHabit, getAllUserHabits, createHabitEntry };