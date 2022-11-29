const pool = require("../../../db/pool");
const validateInputs = require("../../../middleware/validateInputs");
const appConstants = require("../../../constants/appConstants");
const {
  isUserExistsByUserId,
  getUserByUserId,
} = require("../../../dbUtils/users/dbUsersUtils");

module.exports = (router) => {
  router.post("/delete-user", validateInputs, async (req, res) => {
    console.log("Route:", req.path);

    const {
      usersTable,
      userVerificationTokensTable,
      userRoleTable,
      userDetailsTable,
      userPermissionTable,
    } = appConstants.SQL_TABLE;

    try {
      // destructure req body
      const { userId } = req.body;

      const isUserExists = await isUserExistsByUserId(userId);

      // if user does not exists throw error
      if (!isUserExists) {
        return res.status(401).json({ error: "User does not exists" });
      }

      const user = await getUserByUserId(userId);

      const deleteuserPermissionRes = await pool.query(
        `DELETE FROM ${userPermissionTable}
          WHERE user_id = $1`,
        [userId]
      );
      const deleteuserPermission = deleteuserPermissionRes.rows;
      console.log({ deleteuserPermission });

      const deleteuserVerificationTokenRes = await pool.query(
        `DELETE FROM ${userVerificationTokensTable}
          WHERE user_id = $1`,
        [userId]
      );
      const deleteuserVerificationToken = deleteuserVerificationTokenRes.rows;
      console.log({ deleteuserVerificationToken });

      const deleteuserRoleRes = await pool.query(
        `DELETE FROM ${userRoleTable}
          WHERE user_id = $1`,
        [userId]
      );
      const deleteUserRole = deleteuserRoleRes.rows;
      console.log({ deleteUserRole });

      const deleteUserDetailsRes = await pool.query(
        `DELETE FROM ${userDetailsTable}
          WHERE user_id = $1`,
        [userId]
      );
      const deleteUserDetails = deleteUserDetailsRes.rows;
      console.log({ deleteUserDetails });

      const deleteUserRes = await pool.query(
        `DELETE FROM ${usersTable}
          WHERE user_id = $1
          RETURNING *`,
        [userId]
      );
      const deleteUser = deleteUserRes.rows;
      console.log({ deleteUser });

      return res
        .status(200)
        .json({ message: "User successfully deleted", user });
    } catch (error) {
      console.error("Error while deleting user", error);
      return res.status(500).send("Server error");
    }
  });
};
