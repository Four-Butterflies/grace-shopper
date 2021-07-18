// Connect to DB
const { Client } = require('pg');
// I chose vinyldb as our DB name
const DB_NAME = 'vinyldb';
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

module.exports = client;
