const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get(
    "/getTopics",
    [authorization, authorizeAdmin],
    async (req, res) => {
      console.log("Route:", req.originalUrl);
      const { device } = appConstants.SQL_TABLE;

      try {
        const getRes = await pool.query(
          `SELECT device_id, client_topic FROM ${device}`
        );
        const data = getRes.rows.map((temp) => {
          return {
            deviceId: temp.device_id,
            topic: temp.client_topic,
          };
        });
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json("Server error");
      }
    }
  );
};
