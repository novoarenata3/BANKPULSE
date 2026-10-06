const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'bankpulse-db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'bankpulse_pass',
  database: process.env.DB_NAME || 'bankpulse_db',
});

// Inicialización de la tabla Modelo
const initDb = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      sender_account VARCHAR(50) NOT NULL,
      receiver_account VARCHAR(50) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'COMPLETED',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

initDb().catch(console.error);

module.exports = {
  createTransaction: async (sender, receiver, amount) => {
    const res = await pool.query(
      'INSERT INTO transactions (sender_account, receiver_account, amount) VALUES ($1, $2, $3) RETURNING *',
      [sender, receiver, amount]
    );
    return res.rows[0];
  },
  getTransactions: async () => {
    const res = await pool.query('SELECT * FROM transactions ORDER BY created_at DESC');
    return res.rows;
  },
  pool
};
