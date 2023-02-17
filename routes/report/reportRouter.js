const router = require("express").Router();

require("./reportRoutes/between-dates")(router);
require("./reportRoutes/between-dates-specific-device")(router);

module.exports = router;
