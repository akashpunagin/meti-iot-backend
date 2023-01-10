const router = require("express").Router();

require("./sensorMasterRoutes/add")(router);
require("./sensorMasterRoutes/get-sensors-of-device")(router);

module.exports = router;
