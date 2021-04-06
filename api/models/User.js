const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class User {
    constructor(data) {
        this.username = data.username;
        this.passwordDigest = data.password;
        this.id = data.id;
    }

    static find(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`SELECT * FROM users
                        WHERE username = ${username};`);
                const user = new User(result.rows[0]);
                resolve(user);
            } catch (error) {
                reject(`Could not retrieve username`);
            }
        });
    }

    static create({ username, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`INSERT INTO users (username, password)
                        VALUES (${username},${password}) RETURNING *;`)

                const user = new User(result.rows[0]);
                resolve(user);
            } catch (error) {
                reject(`Could not create user: ${error}`);
            }

        });
    }
}

module.exports = User;