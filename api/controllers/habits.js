const { Habit, UserHabit } = require('../models/Habit');

const express = require('express');
const streak = require('../helpers/streak');
const formatData = require('../helpers/formatHabits');

const router = express.Router();

async function showAllHabits(req, res) {
  try {
    const habits = await Habit.all;
    res.status(200).json(habits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createHabit(req, res) {
  try {
    const habit = await Habit.create({ ...req.body });
    res.status(201).json(habit)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createUserHabit(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const jsDate = new Date().toLocaleString('en-US', {timeZone: 'Europe/London'})
    const userHabit = await UserHabit.createUserHabit({ ...req.body, date:jsDate}, req.params.username);
    res.status(201).json(userHabit)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function getUserHabits(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabits = await UserHabit.getUserHabits(req.params.username)
    res.status(200).json(userHabits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function deleteUserHabit(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabit = await UserHabit.deleteUserHabit(req.params.id)
    res.status(204).json(userHabit)
  
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function createHabitEntry(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const jsDate = new Date().toLocaleString('en-US', {timeZone: 'Europe/London'})
    const habitEntry = await UserHabit.createHabitEntry({ ...req.body, date: jsDate});
    res.status(201).json(habitEntry)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function deleteHabitEntry(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const deleteHabit = await UserHabit.deleteHabitEntry(req.params.id);
    res.status(204).json(deleteHabit)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function getUserHabitEntries(req, res) {
  try {
      //check if valid jwt is for the requested user
      // if (res.locals.user !== req.params.username) throw err
      const userHabits = await UserHabit.getUserHabitEntries(req.params.username)
      const habitsList = await UserHabit.getUserHabits(req.params.username)
      const streakData = streak(userHabits.allEntries)
      const result = formatData(habitsList, userHabits.habits, streakData)
      res.status(200).json(result)
      // res.json(result)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

async function autoFillHabitEntries(req, res) {
  try {
    //check if valid jwt is for the requested user
    // if (res.locals.user !== req.params.username) throw err
    const userHabits = await UserHabit.autoFillHabitEntries()
    res.status(201).json(userHabits)
  } catch (err) {
    res.status(403).send({ err: err })
  }
}

const schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/London';
rule.second = 59;
rule.minute = 59;
rule.hour = 23;
schedule.scheduleJob(rule, async function () {
  try {
    await UserHabit.autoFillHabitEntries();
  } catch (err) {
    console.error(err)
  }
});


module.exports = { showAllHabits, createHabit, createUserHabit, getUserHabits, getUserHabitEntries, createHabitEntry, autoFillHabitEntries , deleteUserHabit,deleteHabitEntry};
