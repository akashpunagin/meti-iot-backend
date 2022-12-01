const pool = require("../../../db/pool");
const { authorization } = require("../../../middleware/exportMiddlewares");

module.exports = (router) => {
  router.get("/me", [authorization], async (req, res) => {
    console.log("Route:", req.originalUrl);

    try {
      return res.status(200).json(req.user);
    } catch (error) {
      console.log("ADD Device error", error);
      return res.status(500).json("Server error");
    }
  });
};
