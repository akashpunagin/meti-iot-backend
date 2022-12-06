const pool = require("../../../db/pool");
const { authorization } = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.get("/get-my-devices", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);
    const { device } = appConstants.SQL_TABLE;

    try {
      const getRes = await pool.query(
        `SELECT * FROM ${device}
        WHERE user_id = $1`,
        [req.user.userId]
      );
      const data = getRes.rows.map((temp) => {
        //TODO change this or remove this (change key value from underscore to cap case)
        return temp;
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};
