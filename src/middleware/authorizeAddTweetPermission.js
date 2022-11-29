const jwt = require("jsonwebtoken");
const payloadGenerator = require("./../utilities/payloadGenerator");
const pool = require("../db/pool");
const appConstants = require("../constants/appConstants");
const { getUserPermissionByUserId } = require("../dbUtils/users/dbUsersUtils");

require("dotenv").config();

module.exports = async (req, res, next) => {
  console.log("CHECKING ADD TWEET AUTHORIZATION MIDDLEWARE");
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

    const userPermission = await getUserPermissionByUserId(user.user_id);

    console.log({ userPermission });

    const isPermSendTweet = userPermission.perm_send_tweet;

    if (!isPermSendTweet) {
      return res.status(403).json({ error: "Not Authorized to Send tweet" });
    }

    next();
  } catch (error) {
    console.error("PERMISSION Authorization middleware error", error);
    return res.status(403).json({ error: "Not Authorized" });
  }
};
