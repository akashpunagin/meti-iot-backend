const pool = require("../../../db/pool");

module.exports = (router) => {
  router.get("/get", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      const { id, name } = req.body;

      const addRes = await pool.query(`SELECT * FROM temp`);
      const temps = addRes.rows.map((temp) => {
        return {
          groupId: temp.id,
          groupName: temp.name,
        };
      });
      return res.status(200).json(temps);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};
