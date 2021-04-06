const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Habit {
  constructor(data) {
    this.habitName = data.name;
  }

  static find(habitName) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`SELECT * FROM habits WHERE    name = ${habitName};`);
        const habit = new Habit(result.rows[0]);
        resolve(habit)
      } catch (error) {
        reject(`Could not retrieve habit`);
      }
    });
  }

  static create(habitName) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`INSERT INTO habits (name) VALUES (${habitName}) RETURNING *;`);
        const habit = new Habit(result.rows[0]);
        resolve(habit)
      } catch (error) {
        reject(`Could not create habit`);
      }
    });
  }
}

class User_Habits {
  constructor(data) {
    this.frequency = data.frequency;
    this.completed = data.completed;
  }

  static storeFrequency(frequency) {
    return new Promise(async (resolve,reject) => {
      try{
        const result = await db.query(
          SQL`INSERT INTO user_habits (frequency) VALUES (${frequency}) RETURNING *;`) // Have to add userID & HabitID?
        const habitFrequency = new User_Habits(result.rows[0]);
        resolve(habitFrequency)
      } catch (error) {
          reject(`Could not store frequency: ${error}`);
      }
    })
  }

  static isComplete(completed) {
    return new Promise(async (resolve,reject) => {
      try{
        const result = await db.query(
          SQL`INSERT INTO habit_entries (completed) VALUES (${completed}) RETURNING *;`) // Have to add userhabitID?
        const progress = new isComplete(result.rows[0]);
        resolve(progress)
      } catch (error) {
        reject(`Could not determine progress: ${error}`);
      }
    })
  }
}

module.exports = {Habit, User_Habits};
