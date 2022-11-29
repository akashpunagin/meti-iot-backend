const pool = require("../../../db/pool");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get("/verify-email", async (req, res) => {
    console.log("Route:", req.path);

    const { usersTable, userVerificationTokensTable } = appConstants.SQL_TABLE;

    try {
      const { jwtToken } = req.query;

      const userIdWithTokenRes = await pool.query(
        `SELECT u.user_id, v.token
            FROM ${usersTable} AS u, ${userVerificationTokensTable} as v
            WHERE v.user_id = u.user_id and v.token = $1`,
        [jwtToken]
      );

      if (userIdWithTokenRes.rowCount === 0) {
        return res.status(401).json({ error: "Token invalid" });
      }

      const userIdWithToken = userIdWithTokenRes.rows[0];
      const userId = userIdWithToken.user_id;
      console.log("TOKEN FOUND: userID: ", userId);

      // update this userIds verified column
      await pool.query(
        `UPDATE ${usersTable}
            SET user_is_verified = True
            WHERE user_id = $1`,
        [userId]
      );

      // delete user entry in verification tokens db
      await pool.query(
        `DELETE FROM ${userVerificationTokensTable}
            WHERE token = $1`,
        [jwtToken]
      );

      return res.status(200).send("Email Verified Successfully");
    } catch (error) {
      console.error("ERROR while verifying email", error);
      return res.status(500).json("Server error");
    }
  });
};
