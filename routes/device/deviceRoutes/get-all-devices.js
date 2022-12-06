const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get(
    "/get-all-devices",
    [authorization, authorizeAdmin],
    async (req, res) => {
      console.log("Route:", req.originalUrl);
      const { device, users } = appConstants.SQL_TABLE;

      try {
        const getRes = await pool.query(
          `SELECT d.*, u.first_name, u.last_name, u.user_id
          FROM ${device} as d, ${users} as u
        WHERE d.user_id = u.user_id`
        );

        const data = getRes.rows.map((temp) => {
          const firstName = temp.first_name;
          const lastName = temp.last_name;
          const userId = temp.user_id;

          delete temp["first_name"];
          delete temp["last_name"];
          delete temp["user_id"];

          return { ...temp, user: { userId, firstName, lastName } };
        });
        return res.status(200).json(data);
      } catch (error) {
        console.log("Get all devices error:", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
