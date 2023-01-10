const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.post(
    "/get-sensors-of-device",
    [authorization, authorizeAdmin, validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { sensorMaster } = appConstants.SQL_TABLE;

      try {
        const { device_id } = req.body;

        const getRes = await pool.query(
          `SELECT * FROM ${sensorMaster}
            WHERE device_id = $1`,
          [device_id]
        );

        if (getRes.rowCount === 0) {
          return res.status(401).json({ error: "Device does not exists" });
        }

        const sensors = getRes.rows;
        sensors.forEach((sensor) => {
          delete sensor.meter_idx;
        });

        return res.status(200).json(sensors);
      } catch (error) {
        console.log("ADD Sensor Master error", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
