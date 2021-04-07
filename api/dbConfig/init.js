const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL

const env = process.env.NODE_ENV;

let options;

if (env === "production") {
  options = { connectionString, ssl: { rejectUnauthorized: false } }
} else {
  options = { connectionString }
}

const pool = new Pool(options);

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  }
}
