const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.showAllHabits);
router.post('/', habitsController.createHabit);


router.get('/fill', habitsController.autoFillHabitEntries);


module.exports = router;