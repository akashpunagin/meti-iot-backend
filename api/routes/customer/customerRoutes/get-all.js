const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get-all", [authorization, authorizeAdmin], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { users, userRole } = appConstants.SQL_TABLE;

    try {
      const getCustomersRes = await pool.query(
        `SELECT u.*
          FROM ${users} as u, ${userRole} as ur
          WHERE u.user_id = ur.user_id AND
            ur.role_customer = true`
      );
      const data = getCustomersRes.rows.map((user) => {
        return {
          userId: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          country: user.country,
          state: user.state,
          city: user.city,
          zip: user.zip,
          address: user.address,
          contact_number: user.contact_number,
        };
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};
