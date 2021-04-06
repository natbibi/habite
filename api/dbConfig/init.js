const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString,
    // ssl: {
      // rejectUnauthorized: false
    // }
})
module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  }
}
