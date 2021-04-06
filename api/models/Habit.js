const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Habit {
  constructor(data) {
    this.habitName = data.name;
  }

  static get all() {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`SELECT * FROM habits`);
        const habits = result.rows.map(habit => new Habit(habit))
        resolve(habits)
      } catch (error) {
        reject(`Could not retrieve habit`);
      }
    });
  }

  static find(id) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`SELECT * FROM habits WHERE id = ${id};`);
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

class UserHabit extends Habit {
  constructor(data) {
    super(data)
    this.frequency = data.frequency
  }

  static createUserHabit(user_habit_data) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`INSERT INTO user_habits (habit_id, user_id, frequency) VALUES (${user_habit_data.habit_id}, ${user_habit_data.user_id}, ${user_habit_data.frequency}) RETURNING *;`);
        const newUserHabit = result.rows[0];
        resolve(newUserHabit)
      } catch (error) {
        reject(`Could not create habit`);
      }
    });
  }

  static createHabitEntry(data) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`INSERT INTO habit_entries (user_habit_id, completed) VALUES (${data.user_habit_id}, ${data.completed}) RETURNING *;`);
        const newHabitEntry = result.rows[0];
        resolve(newHabitEntry)
      } catch (error) {
        reject(`Could not create habit`);
      }
    });
  }

  static getUserHabits(username) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`
        select users.username, habits.name, habit_entries.completed, habit_entries.id FROM habit_entries
        JOIN
        user_habits on habit_entries.user_habit_id = user_habits.id
        JOIN 
        users on user_habits.user_id = users.id
        JOIN
        habits on user_habits.habit_id = habits.id
        WHERE users.username = ${username};`);
        const habits = result.rows.map(habit => ({name: habit.name, username: habit.username, completed: habit.completed, id: habit.id}))
        resolve(habits)
      } catch (error) {
        reject(`Could not retrieve habit`);
      }
    });
  }

  // static storeFrequency(frequency) {
  //   return new Promise(async (resolve,reject) => {
  //     try{
  //       const result = await db.query(
  //         SQL`INSERT INTO user_habits (frequency) VALUES (${frequency}) RETURNING *;`) // Have to add userID & HabitID?
  //       const habitFrequency = new User_Habits(result.rows[0]);
  //       resolve(habitFrequency)
  //     } catch (error) {
  //         reject(`Could not store frequency: ${error}`);
  //     }
  //   })
  // }



//   static isComplete(completed) {
//     return new Promise(async (resolve,reject) => {
//       try{
//         const result = await db.query(
//           SQL`INSERT INTO habit_entries (completed) VALUES (${completed}) RETURNING *;`) // Have to add userhabitID?
//         const progress = new isComplete(result.rows[0]);
//         resolve(progress)
//       } catch (error) {
//         reject(`Could not determine progress: ${error}`);
//       }
//     })
//   }
}

module.exports = {Habit, UserHabit};
