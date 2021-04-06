const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');
const User = require('./User')

class Habit {
  constructor(data) {
    this.name = data.name;
    this.id = data.id
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

  static create(data) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`INSERT INTO habits (name) VALUES (${data.name}) RETURNING *;`);
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

  static createUserHabit(data, username) {
    return new Promise (async (resolve,reject) => {
      try{
        const user = await User.find(username)
        const result = await db.query(SQL`INSERT INTO user_habits (habit_id, user_id, frequency) VALUES (${data.habit_id}, ${user.id}, ${data.frequency}) RETURNING *;`);
        const newUserHabit = result.rows[0];
        resolve(newUserHabit)
      } catch (error) {
        reject(`Could not create habit`);
      }
    });
  }

  static getUserHabits(username) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`
        select users.username, users.id AS user_id, habits.id AS habit_id, habits.name AS habit_name, user_habits.frequency FROM user_habits
        JOIN
        habits on user_habits.id = habits.id
        JOIN 
        users on user_habits.user_id = users.id
        WHERE users.username = ${username};`);
        const habits = result.rows.map(habit => ({habit_name: habit.habit_name, username: habit.username, habit_id: habit.habit_id, frequency: habit.frequency, user_id: habit.user_id }))
        resolve(habits)
      } catch (error) {
        reject(`Could not retrieve habit`);
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

  static autoFillHabitEntries() {
    return new Promise (async (resolve,reject) => {
      try {
        const result = await UserHabit.getAllUserHabitsCount()
        for (let i in result) {
          for (let j=0; j<result[i].diff; j++) {
            await db.query(SQL`
            INSERT INTO habit_entries (user_habit_id, completed) 
            VALUES
            (${result[i].user_habit_id},false);
          `)
          }
        }
        resolve()
      } catch(error) {
        reject('failed to autocomplete')
      }
    })
  }

  static getAllUserHabitsCount() {
    return new Promise (async (resolve,reject) => {
      try{
        const res = await db.query(SQL`
        SELECT users.username, user_habits.id AS user_habit_id, user_habits.frequency, count(*), to_char(completed_at, 'DD-MON-YYYY') as date
        FROM user_habits 
        JOIN users ON user_habits.user_id = users.id
        JOIN habit_entries ON user_habits.id = habit_entries.user_habit_id
        GROUP BY users.username, date, user_habits.id;
        `)
        const data = res.rows.map(row => ({user_habit_id: row.user_habit_id, diff: row.frequency - row.count}))
        resolve(data)
      } catch (error) {
        reject(`Could not retrieve habit`);
      }
    });
  }
  static getUserHabitEntries(username) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`
        select users.username, habits.name, habit_entries.completed, habit_entries.id, habit_entries.completed_at FROM habit_entries
        JOIN
        user_habits on habit_entries.user_habit_id = user_habits.id
        JOIN 
        users on user_habits.user_id = users.id
        JOIN
        habits on user_habits.habit_id = habits.id
        WHERE users.username = ${username};`);
        const habits = result.rows.map(habit => ({name: habit.name, username: habit.username, completed: habit.completed, id: habit.id, timestamp: habit.completed_at }))
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
