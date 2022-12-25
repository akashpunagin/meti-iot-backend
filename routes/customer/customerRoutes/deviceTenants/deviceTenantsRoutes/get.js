const pool = require("../../../../../db/pool");
const {
  authorization,
} = require("../../../../../middleware/exportMiddlewares");
const appConstants = require("../../../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { users, userRole, deviceTenant } = appConstants.SQL_TABLE;

    try {
      const getDeviceTenantsRes = await pool.query(
        `SELECT *FROM ${deviceTenant}`
      );
      const data = getDeviceTenantsRes.rows;
      return res.status(200).json(data);
    } catch (error) {
      console.log("GET DEVICE TenantS ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
