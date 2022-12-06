const pool = require("../../../db/pool");

module.exports = (router) => {
  router.get("/getData", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      const getRes = await pool.query(`
      SELECT v.*, m.sensor_name
      FROM 
        sensor_value as v,
        sensor_master as m
      WHERE
        v.device_id = m.device_id AND
        v.sensor_idx = m.sensor_idx
      `);

      const data = getRes.rows;

      const uniqueDeviceIds = [...new Set(data.map((item) => item.device_id))];

      console.log("GET DATA:");
      for (const deviceId of uniqueDeviceIds) {
        console.log("Device Id:", deviceId);

        const filteredByDeviceId = data.filter(
          (item) => item.device_id === deviceId
        );

        const uniqueSensorNames = [
          ...new Set(filteredByDeviceId.map((item) => item.sensor_name)),
        ];

        console.log("Unique sensors of device id:", uniqueSensorNames);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET SENSOR VALUE ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
