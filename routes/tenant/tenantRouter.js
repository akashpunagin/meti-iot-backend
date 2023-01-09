const router = require("express").Router();

require("./tenantRoutes/get-by-customer-id")(router);
require("./tenantRoutes/get-all")(router);
require("./tenantRoutes/get-assigned-devices")(router);

module.exports = router;
