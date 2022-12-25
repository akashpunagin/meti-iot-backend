const router = require("express").Router();

require("./deviceTenantsRoutes/get")(router);
require("./deviceTenantsRoutes/add")(router);
require("./deviceTenantsRoutes/delete")(router);
// require("./deviceTenantsRoutes/update")(router);

module.exports = router;
