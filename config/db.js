const { Sequelize } = require('sequelize');
require('dotenv').config();

// DB-1
const centralDB = new Sequelize(
  process.env.CENTRAL_DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

// DB-2
const projectDB = new Sequelize(
  process.env.PROJECT_DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = { centralDB, projectDB };