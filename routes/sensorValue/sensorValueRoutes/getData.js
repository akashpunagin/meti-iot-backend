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
      return res.status(200).json(data);
    } catch (error) {
      console.log("GET SENSOR VALUE ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
