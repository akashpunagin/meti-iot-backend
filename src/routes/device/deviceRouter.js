const router = require("express").Router();

require("./deviceRoutes/getTopics")(router);

module.exports = router;
