const { Sequelize } = require('sequelize');
require('dotenv').config();

// 1. Setup for Centralized Database (Shared by all products)
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

// 2. Setup for Project Database (Specific to "Autos" project)
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