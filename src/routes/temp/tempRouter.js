const router = require("express").Router();

require("./tempRoutes/add")(router);
require("./tempRoutes/get")(router);

module.exports = router;
