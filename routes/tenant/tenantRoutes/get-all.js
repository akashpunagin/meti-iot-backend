const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");
const { getUserByUserId } = require("../../../dbUtils/users/dbUsersUtils");

module.exports = (router) => {
  router.get("/get-all", [authorization, authorizeAdmin], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { users, userRole, customerTenant } = appConstants.SQL_TABLE;

    try {
      const { customerId } = req.body;

      const getTenantsRes = await pool.query(
        `SELECT tenant_id
          FROM ${customerTenant}`
      );
      const tenantIds = getTenantsRes.rows.map((tenant) => tenant.tenant_id);

      const data = [];
      for (const tenantId of tenantIds) {
        console.log(tenantId);
        const tenant = await getUserByUserId(tenantId);
        data.push(tenant);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET Tenant ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
