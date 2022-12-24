const pool = require("../../../../../db/pool");
const {
  authorization,
} = require("../../../../../middleware/exportMiddlewares");
const appConstants = require("../../../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { users, userRole, deviceTenent } = appConstants.SQL_TABLE;

    try {
      const getDeviceTenentsRes = await pool.query(
        `SELECT *FROM ${deviceTenent}`
      );
      const data = getDeviceTenentsRes.rows;
      return res.status(200).json(data);
    } catch (error) {
      console.log("GET DEVICE TENENTS ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
