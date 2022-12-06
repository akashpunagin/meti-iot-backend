const router = require("express").Router();

require("./authRoutes/register-customer")(router);
require("./authRoutes/register-admin")(router);

require("./authRoutes/delete-user")(router);

require("./authRoutes/send-confirmation-email")(router);
require("./authRoutes/verify-email")(router);
require("./authRoutes/refresh-token")(router);
require("./authRoutes/login")(router);
require("./authRoutes/is-token-valid")(router);
require("./authRoutes/logout")(router);
require("./authRoutes/is-admin")(router);

module.exports = router;