const pool = require("../../../db/pool");
const { authorization } = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get-assigned-devices", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { deviceTenant, device } = appConstants.SQL_TABLE;

    console.log("SEE", req.user.userId);

    try {
      const getRes = await pool.query(
        `SELECT * FROM ${deviceTenant}
        WHERE tenant_id = $1`,
        [req.user.userId]
      );

      const deviceTenantRows = getRes.rows;

      const deviceIds = deviceTenantRows.map((res) => res.device_id);
      console.log({ deviceIds });

      const data = [];

      for (const deviceId of deviceIds) {
        const getRes = await pool.query(
          `SELECT * FROM ${device}
            WHERE device_id = $1`,
          [deviceId]
        );
        const deviceData = getRes.rows[0];
        data.push(deviceData);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET DEVICE Tenants ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
