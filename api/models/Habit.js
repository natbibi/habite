const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Habit {
  constructor(data) {
    this.id = data.id;
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