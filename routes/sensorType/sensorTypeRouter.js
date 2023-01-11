const router = require("express").Router();

require("./sensorTypeRoutes/get")(router);

module.exports = router;
