const jwt = require("jsonwebtoken");
const payloadGenerator = require("./../utilities/payloadGenerator");
const pool = require("../db/pool");
const appConstants = require("../constants/appConstants");
const { getUserRoleByUserId } = require("../dbUtils/users/dbUsersUtils");

require("dotenv").config();

module.exports = async (req, res, next) => {
  console.log("CHECKING AUTHORIZATION ADMIN MIDDLEWARE");
  const { usersTable, userRoleTable } = appConstants.SQL_TABLE;

  try {
    const authHeader = req.header("Authorization"); // Bearer TOKEN
    const jwtToken = authHeader && authHeader.split(" ")[1];

    console.log({ jwtToken });

    if (!jwtToken) {
      return res.status(403).json({ error: "Not Authorized" });
    }

    const rawPayload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    const payload = payloadGenerator(rawPayload);

    const user = payload;

    const userRole = await getUserRoleByUserId(user.user_id);
    const isRoleAdmin = userRole.role_admin;

    if (!isRoleAdmin) {
      return res.status(403).json({ error: "Not Authorized as Admin" });
    }

    next();
  } catch (error) {
    console.error("ADMIN Authorization middleware error", error);
    return res.status(403).json({ error: "Not Authorized" });
  }
};
