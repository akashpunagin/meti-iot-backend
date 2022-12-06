const pool = require("../../../db/pool");
const validateInputs = require("../../../middleware/validateInputs");

module.exports = (router) => {
  router.get("/getData", [validateInputs], async (req, res) => {
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
      `,
        [deviceId]
      );

      const data = getRes.rows;

      console.log("GET DATA:");

      const uniqueSensorNames = [
        ...new Set(data.map((item) => item.sensor_name)),
      ];

      console.log("Unique sensors of device id:", uniqueSensorNames);

      const actualData = data.reduce((obj, item) => {
        if (obj[item.sensor_name]) {
          obj[item.sensor_name].push({
            value: item.value,
            readingTime: item.reading_time,
          });
        } else {
          obj[item.sensor_name] = [
            {
              value: item.value,
              readingTime: item.reading_time,
            },
          ];
        }

        return obj;
      }, {});

      return res.status(200).json({
        uniqueSensorNames,
        actualData,
      });
    } catch (error) {
      console.log("GET SENSOR VALUE ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
