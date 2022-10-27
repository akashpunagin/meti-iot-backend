const pool = require("../../../db/pool");

module.exports = (router) => {
  router.post("/addData", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      // const getRes = await pool.query(
      //   `SELECT device_id, client_topic FROM device`
      // );
      // const data = getRes.rows.map((temp) => {
      //   return {
      //     deviceId: temp.device_id,
      //     topic: temp.client_topic,
      //   };
      // });
      return res.status(200).json("add data");
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};
