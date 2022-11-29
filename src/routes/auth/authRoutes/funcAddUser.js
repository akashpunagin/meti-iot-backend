const pool = require("../../../db/pool");
const appConstants = require("../../../constants/appConstants");
const {
  isUserExistsByUserEmail,
} = require("../../../dbUtils/users/dbUsersUtils");
const bcrypt = require("bcrypt");

async function addUser(userDetails) {
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    state,
    city,
    zip,
    address,
    contact_number,
  } = userDetails;

  const { users } = appConstants.SQL_TABLE;

  const isUserExists = await isUserExistsByUserEmail(email);

  // if user exists throw error
  if (isUserExists) {
    return { error: true, errorMessage: "User already exists" };
  }

  // else bcrypt users password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUserRes = await pool.query(
    `INSERT INTO ${users}(first_name, last_name, email, password,
      country, state, city, zip, address, contact_number)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING user_id, first_name, last_name, email, password,
        country, state, city, zip, address, contact_number`,
    [
      firstName,
      lastName,
      email,
      bcryptPassword,
      country,
      state,
      city,
      zip,
      address,
      contact_number,
    ]
  );

  const newUser = newUserRes.rows[0];
  console.log("REGISTERING USER: ", newUser);
  return { error: false, data: newUser };
}

module.exports = addUser;
