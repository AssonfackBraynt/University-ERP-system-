// File: src/config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, String(process.env.DB_PASS), {
  host: process.env.DB_HOST,
  port: process.env.PORT || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;