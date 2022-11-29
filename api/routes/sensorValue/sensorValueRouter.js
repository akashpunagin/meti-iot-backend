const router = require("express").Router();

require("./sensorValueRoutes/addData")(router);
require("./sensorValueRoutes/getData")(router);

module.exports = router;
