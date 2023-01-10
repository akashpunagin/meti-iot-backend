const router = require("express").Router();

require("./sensorMasterRoutes/add")(router);
require("./sensorMasterRoutes/get-sensors-of-device")(router);
require("./sensorMasterRoutes/delete")(router);

module.exports = router;
