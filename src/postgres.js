const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "myapp",
  password: process.env.POSTGRES_PASSWORD || "example",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
