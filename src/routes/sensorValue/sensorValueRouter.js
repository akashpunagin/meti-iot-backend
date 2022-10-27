const router = require("express").Router();

require("./sensorValueRoutes/addData")(router);

module.exports = router;
