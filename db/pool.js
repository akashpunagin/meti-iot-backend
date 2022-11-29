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
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      user: "me",
      password: "password",
      host: "localhost",
      port: 5432,
      database: "meti",
    });

module.exports = pool;
