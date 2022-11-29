const jwt = require("jsonwebtoken");
const payloadGenerator = require("./../utilities/payloadGenerator");
const pool = require("../db/pool");
require("dotenv").config();

module.exports = async (req, res, next) => {
  console.log("CHECKING AUTHORIZATION MIDDLEWARE");
  try {
    const authHeader = req.header("Authorization"); // Bearer TOKEN
    const jwtToken = authHeader && authHeader.split(" ")[1];

    console.log({ jwtToken });

    if (!jwtToken) {
      return res.status(403).json({ error: "Not Authorized" });
    }

    const rawPayload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    const payload = payloadGenerator(rawPayload);

    console.log("Auth middleware, ", { payload });

    req.user = payload;

    // Verify user refresh token
    const userRefreshTokenRes = await pool.query(
      `SELECT u.refresh_token
      FROM users AS u
      WHERE u.user_id = $1
      `,
      [req.user.userId]
    );

    if (userRefreshTokenRes.rowCount === 0) {
      return res.status(403).json({ error: "Not Authorized" });
    }

    const userRefreshToken = userRefreshTokenRes.rows[0].user_refresh_token;

    if (userRefreshToken === null) {
      console.log(
        `User ${req.user.user_first_name} does not have refresh token`
      );
      return res.status(403).json({ error: "Not Authorized" });
    }

    next();
  } catch (error) {
    console.error("Authorization middleware error", error);
    return res.status(403).json({ error: "Not Authorized" });
  }
};
