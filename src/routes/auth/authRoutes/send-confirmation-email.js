const pool = require("../../../db/pool");
const validateInputs = require("../../../middleware/validateInputs");
const sendConfirmationEmail = require("../../../utilities/sendConfirmationEmail");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.post("/send-confirmation-email", validateInputs, async (req, res) => {
    console.log("ROUTE:", req.path);

    const { usersTable, userVerificationTokensTable } = appConstants.SQL_TABLE;

    try {
      const { userId } = req.body;

      // get token from db
      const getTokenRes = await pool.query(
        `SELECT u.user_id, u.user_first_name, u.user_last_name, u.user_email, v.token
              FROM ${usersTable} AS u, ${userVerificationTokensTable} as v
              WHERE v.user_id = u.user_id and v.user_id = $1`,
        [userId]
      );

      if (getTokenRes.rowCount === 0) {
        return res.status(401).json({ error: "Invalid data" });
      }

      const firstName = getTokenRes.rows[0].user_first_name;
      const lastName = getTokenRes.rows[0].user_last_name;
      const email = getTokenRes.rows[0].user_email;
      const token = getTokenRes.rows[0].token;

      // send confirmation email
      const newUserFullName = `${firstName} ${lastName}`;
      const isSuccess = await sendConfirmationEmail(
        newUserFullName,
        email,
        token
      );

      if (!isSuccess) {
        return res.status(401).json({ error: "Error while sending email" });
      }
      return res.status(200).json({
        message: "Sent Confirmation email successfully",
        user: { userId, firstName, lastName, email },
      });
    } catch (error) {
      console.error("Error while sending confirmation email", error);
      return res.status(500).json("Server error");
    }
  });
};
