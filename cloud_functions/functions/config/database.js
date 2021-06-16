const { createPool, createConnection } = require("mysql");
require("dotenv").config();

const connectionDetails = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = createPool(connectionDetails);

module.exports = pool;