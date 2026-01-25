const { Pool } = require('pg');

// In a real microservice, this would read from services/restart-iam-service/configs/datasource-config.js
// For now, we use process.env directly.
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'res_db',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
