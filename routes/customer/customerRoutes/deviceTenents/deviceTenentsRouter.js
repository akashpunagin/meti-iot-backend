const router = require("express").Router();

require("./deviceTenentsRoutes/get")(router);
require("./deviceTenentsRoutes/add")(router);
require("./deviceTenentsRoutes/delete")(router);
// require("./deviceTenentsRoutes/update")(router);

module.exports = router;
