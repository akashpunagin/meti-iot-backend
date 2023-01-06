const pool = require("../../../db/pool");
const { authorization } = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get-assigned-devices", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { deviceTenant } = appConstants.SQL_TABLE;

    console.log("SEE", req.user.userId);

    try {
      const getRes = await pool.query(
        `SELECT * FROM ${deviceTenant}
        WHERE tenant_id = $1`,
        [req.user.userId]
      );

      const data = getRes.rows;

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET DEVICE TenantS ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
