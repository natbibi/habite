const { Pool } = require("pg");
const connectionString = process.env.CONSTRING

const pool = new Pool({
    connectionString,
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
