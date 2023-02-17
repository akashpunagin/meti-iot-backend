const router = require("express").Router();

require("./csvRoutes/between-dates")(router);
require("./csvRoutes/between-dates-speficic-device")(router);

module.exports = router;
