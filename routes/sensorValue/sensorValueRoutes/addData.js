const pool = require("../../../db/pool");

module.exports = (router) => {
  router.post("/addData", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      const { device_id, sensor_idx, value } = req.body;

      console.log("ADD DATA:", { device_id, sensor_idx, value });

      const addRes = await pool.query(
        `INSERT INTO sensor_value(device_id, sensor_idx, value, reading_time)
        VALUES($1, $2, $3, NOW())
        RETURNING *`,
        [device_id, sensor_idx, value]
      );

      console.log(addRes.rows);

      return res.status(200).json({
        status: "Success",
        data: addRes.rows[0],
      });
    } catch (error) {
      console.log("ADD DATA ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
