const router = require("express").Router();

require("./sensorMasterRoutes/add")(router);

module.exports = router;
