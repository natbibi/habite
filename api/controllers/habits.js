const { Habit, UserHabit } = require('../models/Habit');

const express = require('express');
const streak = require('../helpers/streak');
const router = express.Router();

async function showAllHabits(req, res) {
  try {
    const habits = await Habit.all;
    res.json(habits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createHabit(req, res) {
  try {
         /*
      if (habit == 'hello') {
        //continue
        console.log('input is fine');
        res.json(habit)
      } else {
        throw err;
        console.log(err);
      }
      */
      /*
      if (habitName != 'hi') {
        throw err
      } else {
        res.json(habit)
        console.log('try executed')
      }
      */
    const habit = await Habit.create({ ...req.body });
    res.json(habit)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createUserHabit(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabit = await UserHabit.createUserHabit({ ...req.body }, req.params.username);
    res.json(userHabit)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function getUserHabits(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabits = await UserHabit.getUserHabits(req.params.username)
    res.json(userHabits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function deleteUserHabit(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabit = await UserHabit.deleteUserHabit(req.params.id)
    res.json(userHabit)
  
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createHabitEntry(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const habitEntry = await UserHabit.createHabitEntry({ ...req.body });
    res.json(habitEntry)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function getUserHabitEntries(req, res) {
  try {
      //check if valid jwt is for the requested user
      // if (res.locals.user !== req.params.username) throw err
      const userHabits = await UserHabit.getUserHabitEntries(req.params.username)
      console.log(userHabits)
      const streakData = streak(userHabits.allEntries)
      res.json({data: userHabits.habits, streakData: streakData})
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function autoFillHabitEntries(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabits = await UserHabit.autoFillHabitEntries()
    res.json(userHabits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

const schedule = require('node-schedule');

const job = schedule.scheduleJob(`0 0 * * *`, async function () {
  try {
    const userHabits = await UserHabit.autoFillHabitEntries();
    console.log('habit_entires auto completed')
  } catch (err) {
    console.log(err)
  }
});


module.exports = { showAllHabits, createHabit, createUserHabit, getUserHabits, getUserHabitEntries, createHabitEntry, autoFillHabitEntries , deleteUserHabit};