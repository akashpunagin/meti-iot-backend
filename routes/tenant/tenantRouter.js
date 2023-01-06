const router = require("express").Router();

require("./tenantRoutes/get")(router);
require("./tenantRoutes/get-all")(router);
require("./tenantRoutes/get-assigned-devices")(router);

module.exports = router;
