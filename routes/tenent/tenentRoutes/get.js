const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");
const { getUserByUserId } = require("../../../dbUtils/users/dbUsersUtils");

module.exports = (router) => {
  router.post("/get", [validateInputs, authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { users, userRole, customerTenent } = appConstants.SQL_TABLE;

    try {
      const { customerId } = req.body;

      const getTenentsRes = await pool.query(
        `SELECT tenent_id
          FROM ${customerTenent}
          WHERE customer_id = $1`,
        [customerId]
      );
      const tenentIds = getTenentsRes.rows.map((tenent) => tenent.tenent_id);

      const data = [];
      for (const tenentId of tenentIds) {
        console.log(tenentId);
        const tenent = await getUserByUserId(tenentId);
        data.push(tenent);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET TENENT ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
