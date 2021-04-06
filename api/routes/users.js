const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')
const { verifyToken } = require('./../middleware/auth');
const habitsController = require('../controllers/habits')

router.get('/:username', verifyToken, usersController.show)

// these will need verifyToken too
router.get('/:username/habits', habitsController.getUserHabits);
router.get('/:username/habits/entries', habitsController.getUserHabitEntries);
router.post('/:username/habits', habitsController.createUserHabit);
router.post('/:username/habits/entries', habitsController.createHabitEntry);

module.exports = router;