const pool = require("../../../../../db/pool");
const {
  authorization,
  validateInputs,
} = require("../../../../../middleware/exportMiddlewares");
const appConstants = require("../../../../../constants/appConstants");

module.exports = (router) => {
  router.delete(
    "/delete",
    [validateInputs, authorization],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { deviceTenant } = appConstants.SQL_TABLE;

      try {
        const { tenantId, deviceId } = req.body;

        const delRes = await pool.query(
          `DELETE FROM ${deviceTenant}
          WHERE
            device_id = $1 AND
            tenant_id = $2
        RETURNING *`,
          [deviceId, tenantId]
        );

        const data = delRes.rows;
        return res.status(200).json(data);
      } catch (error) {
        console.log("GET DEVICE TenantS ERROR", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
