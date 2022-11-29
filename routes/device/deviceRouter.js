const router = require("express").Router();

require("./deviceRoutes/getTopics")(router);
require("./deviceRoutes/add")(router);

module.exports = router;
