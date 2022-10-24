const pool = require("../../../db/pool");

module.exports = (router) => {
  router.post("/add", async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      console.log("SEE", req.body);
      const { id, name } = req.body;

      const addRes = await pool.query(
        `INSERT INTO temp(id, name)
        VALUES($1, $2)
        RETURNING *`,
        [id, name]
      );
      const newTemp = addRes.rows[0];
      return res.status(200).json(newTemp);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  });
};
