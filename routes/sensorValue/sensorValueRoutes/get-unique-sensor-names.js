const pool = require("../../../db/pool");
const validateInputs = require("../../../middleware/validateInputs");

module.exports = (router) => {
  router.post(
    "/get-unique-sensor-names",
    [validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { deviceId } = req.body;

      try {
        const getRes = await pool.query(
          `
      SELECT v.*, m.sensor_name
      FROM 
        sensor_value as v,
        sensor_master as m
      WHERE
        v.device_id = m.device_id AND
        v.sensor_idx = m.sensor_idx AND
        v.device_id = $1
      ORDER BY v.reading_time
      `,
          [deviceId]
        );

        const data = getRes.rows;

        const uniqueSensorNames = [
          ...new Set(data.map((item) => item.sensor_name)),
        ];

        console.log("Unique sensors of device id:", uniqueSensorNames);

        return res.status(200).json(uniqueSensorNames);
      } catch (error) {
        console.log("GET UNIQUE SENSOR NAMES ERROR:", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
