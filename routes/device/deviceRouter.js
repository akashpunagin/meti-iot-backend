const router = require("express").Router();

require("./deviceRoutes/getTopics")(router);
require("./deviceRoutes/add")(router);
require("./deviceRoutes/get-my-devices")(router);
require("./deviceRoutes/get-all-devices")(router);

module.exports = router;
