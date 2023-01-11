const pool = require("../../../db/pool");
const { authorization } = require("../../../middleware/exportMiddlewares");

module.exports = (router) => {
  router.get("/get", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      const getRes = await pool.query(`SELECT * FROM sensor_type`);
      const data = getRes.rows;

      data.forEach((ele) => delete ele.id);

      return res.status(200).json(data);
    } catch (error) {
      console.log("GET SENSOR VALUE ERROR:", error);
      return res.status(500).json("Server error");
    }
  });
};
