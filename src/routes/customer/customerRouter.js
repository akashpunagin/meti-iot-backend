const router = require("express").Router();

require("./customerRoutes/get-all")(router);

module.exports = router;
