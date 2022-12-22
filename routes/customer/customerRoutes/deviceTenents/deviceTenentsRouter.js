const router = require("express").Router();

require("./deviceTenentsRoutes/get")(router);
require("./deviceTenentsRoutes/add")(router);
// require("./deviceTenentsRoutes/update")(router);
// require("./deviceTenentsRoutes/delete")(router);

module.exports = router;
