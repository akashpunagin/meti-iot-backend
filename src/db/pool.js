const Pool = require("pg").Pool;
const isProdMode = () => false;

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
