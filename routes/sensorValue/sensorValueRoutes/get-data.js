const pool = require("../../../db/pool");
const validateInputs = require("../../../middleware/validateInputs");

module.exports = (router) => {
  router.post("/get-data", [validateInputs], async (req, res) => {
    console.log("Route:", req.originalUrl);

    const { deviceId, parameter } = req.body;

    try {
      const getRes = await pool.query(
        `
      SELECT 
        v.value,
        v.reading_time at time zone 'utc' at time zone 'Asia/Kolkata'
      FROM 
        sensor_value as v,
        sensor_master as m
      WHERE
        v.device_id = m.device_id AND
        v.sensor_idx = m.sensor_idx AND
        v.device_id = $1 AND
        v.reading_time = (
          SELECT
            MAX(reading_time) 
          FROM
            sensor_value as v2,
            sensor_master as m2
          WHERE 
            v2.device_id = m2.device_id AND
            v2.sensor_idx = m2.sensor_idx AND
            v2.device_id = $1 AND
            m2.sensor_name = $2
        ) AND
        m.sensor_name = $2 
      ORDER BY v.reading_time
      `,
        [deviceId, parameter]
      );

      if (getRes.rowCount === 0) {
        return res.status(200).json({ value: 0, reading_time: new Date() });
      } else {
        const data = getRes.rows;
        console.log("GET DATA:", data);

        return res.status(200).json(data[0]);
      }
    } catch (error) {
      console.log("GET SENSOR VALUE ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
