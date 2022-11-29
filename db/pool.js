const Pool = require("pg").Pool;
require("dotenv").config();

const isProd = process.env.IS_PROD_MODE;

const isProdMode = () => {
  if (isProd === "false") {
    return false;
  } else if (isProd === "true") {
    return true;
  }
  return false;
};

const pool = isProdMode()
  ? new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
  : new Pool({
      user: "me",
      password: "password",
      host: "localhost",
      port: 5432,
      database: "meti",
    });

module.exports = pool;
