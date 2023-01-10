const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.post(
    "/add",
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

        const getRes = await pool.query(
          `SELECT * FROM ${sensorMaster}
            WHERE
              device_id = $1 AND 
              sensor_idx = $2 AND
              sensor_name = $3 AND
              sensor_uom = $4 AND
              sensor_report_group = $5`,
          [device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group]
        );
        if (getRes.rowCount > 0) {
          return res
            .status(401)
            .json({ error: "Sensor with the values already exists" });
        }

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
