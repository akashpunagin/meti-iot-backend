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
        const {
          device_id,
          sensor_idx,
          sensor_name,
          sensor_uom,
          sensor_report_group,
        } = req.body;

        const addRes = await pool.query(
          `INSERT INTO ${sensorMaster}(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
          [device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group]
        );

        return res.status(200).json({
          status: "Sensor master added successfully",
          data: addRes.rows[0],
        });
      } catch (error) {
        console.log("ADD Sensor Master error", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
