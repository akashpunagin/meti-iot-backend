const router = require("express").Router();

require("./sensorValueRoutes/addData")(router);
require("./sensorValueRoutes/get-data")(router);
require("./sensorValueRoutes/get-all-data")(router);
require("./sensorValueRoutes/get-unique-sensor-names")(router);

module.exports = router;
