const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.showAllHabits);
router.post('/', habitsController.createHabit);
router.get('/userHabit', habitsController.getAllUserHabits);
router.post('/userHabit', habitsController.createUserHabit);
router.post('/userHabitEntries', habitsController.createHabitEntry);


module.exports = router;