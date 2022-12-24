const router = require("express").Router();

require("./tenentRoutes/get")(router);
require("./tenentRoutes/get-all")(router);

module.exports = router;
