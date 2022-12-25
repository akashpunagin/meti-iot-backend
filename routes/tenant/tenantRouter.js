const router = require("express").Router();

require("./tenantRoutes/get")(router);
require("./tenantRoutes/get-all")(router);

module.exports = router;
