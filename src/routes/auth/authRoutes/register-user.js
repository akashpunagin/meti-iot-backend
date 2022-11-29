const pool = require("../../../db/pool");
const {
  accessTokenGenerator,
  refreshTokenGenerator,
} = require("../../../utilities/jwtGenerator");
const validateInputs = require("../../../middleware/validateInputs");
const appConstants = require("../../../constants/appConstants");
const addUser = require("./funcAddUser");

function getUserRoleColumn(role) {
  if (role === "student") {
    return "role_student";
  } else if (role === "teacher") {
    return "role_teacher";
  } else if (role === "hod") {
    return "role_hod";
  }
}

module.exports = (router) => {
  router.post("/register-user", validateInputs, async (req, res) => {
    console.log("Route:", req.path);

    const {
      usersTable,
      userVerificationTokensTable,
      userRoleTable,
      userDetailsTable,
      userPermissionTable,
      programTable,
      departmentTable,
    } = appConstants.SQL_TABLE;

    try {
      // destructure req body
      const {
        role,
        firstName,
        lastName,
        email,
        password,
        sapId,
        programId,
        departmentId,
      } = req.body;

      const userDetails = {
        firstName,
        lastName,
        email,
        password,
        sapId,
      };

      const isProgramExists = await isProgramExistsByProggamId(programId);

      if (!isProgramExists) {
        return res
          .status(403)
          .json({ error: `Program with id ${programId} was not found` });
      }

      const isDepartmentExists = await isDepartmentExistsByDepartmentId(
        departmentId
      );

      if (!isDepartmentExists) {
        return res
          .status(403)
          .json({ error: `Department with id ${departmentId} was not found` });
      }

      const addUserRes = await addUser(userDetails);
      if (addUserRes.error) {
        return res.status(401).json({ error: addUserRes.errorMessage });
      }
      const newUser = addUserRes.data;

      // save user details
      const userDetailsRes = await pool.query(
        `INSERT INTO ${userDetailsTable}(user_id, user_prog_id, user_dept_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [newUser.user_id, programId, departmentId]
      );
      const newUserDetails = userDetailsRes.rows[0];
      console.log("USER DETAILS: ", newUserDetails);

      // save role of this user
      const userRoleRes = await pool.query(
        `INSERT INTO ${userRoleTable}(user_id, ${getUserRoleColumn(role)})
        VALUES ($1, true)
        RETURNING *`,
        [newUser.user_id]
      );
      const newUserRole = userRoleRes.rows[0];
      console.log("USER ROLE: ", newUserRole);

      const isViewTweetPermission = true;
      const isSendTweetPermission = role === "student" ? false : true;

      // save permission of this user
      const userPermissionRes = await pool.query(
        `INSERT INTO ${userPermissionTable}(user_id, perm_view_tweet, perm_send_tweet)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [newUser.user_id, isViewTweetPermission, isSendTweetPermission]
      );
      const newUserPermission = userPermissionRes.rows[0];
      console.log("USER PERMISSION: ", newUserPermission);

      // generate jwt token
      const accessToken = accessTokenGenerator(newUser);
      const refreshToken = refreshTokenGenerator(newUser);

      // save refresh token in users database
      await pool.query(
        `UPDATE ${usersTable}
          SET user_refresh_token = $1
          WHERE user_id = $2`,
        [refreshToken, newUser.user_id]
      );

      // save the token in db
      await pool.query(
        `INSERT INTO ${userVerificationTokensTable}(user_id, token)
          VALUES($1, $2)`,
        [newUser.user_id, accessToken]
      );

      return res.status(200).json({
        userId: newUser.user_id,
        firstName: newUser.user_first_name,
        lastName: newUser.user_last_name,
        email: newUser.user_email,
        sapId: newUser.user_sap_id,
        programId: newUser.user_prog_id,
        departmentId: newUser.user_dept_id,
      });
    } catch (error) {
      console.error("Error while registering user", error);
      return res.status(500).send("Server error");
    }
  });
};
