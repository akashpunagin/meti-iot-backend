const pool = require("../../../../../db/pool");
const {
  authorization,
  validateInputs,
} = require("../../../../../middleware/exportMiddlewares");
const appConstants = require("../../../../../constants/appConstants");

module.exports = (router) => {
  router.post("/add", [validateInputs, authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { deviceTenent } = appConstants.SQL_TABLE;

    try {
      const { tenentId, deviceId } = req.body;

      const addRes = await pool.query(
        `INSERT INTO ${deviceTenent}(device_id,tenent_id)
        VALUES($1, $2)
        RETURNING *`,
        [deviceId, tenentId]
      );

      const data = addRes.rows;
      return res.status(200).json(data);
    } catch (error) {
      console.log("GET DEVICE TENENTS ERROR", error);
      return res.status(500).json("Server error");
    }
  });
};
