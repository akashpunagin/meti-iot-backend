const router = require("express").Router();

require("./reportRoutes/between-dates")(router);

module.exports = router;
