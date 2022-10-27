const pool = require("../../../db/pool");

module.exports = (router) => {
  router.get("/get-topics", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      const getRes = await pool.query(`SELECT client_topic FROM device`);
      const topics = getRes.rows.map((temp) => {
        return temp.client_topic;
      });
      return res.status(200).json(topics);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};
