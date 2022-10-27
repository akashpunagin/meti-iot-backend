const router = require("express").Router();

require("./deviceRoutes/get")(router);

module.exports = router;
