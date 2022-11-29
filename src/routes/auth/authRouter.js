const router = require("express").Router();

require("./authRoutes/register-user")(router);
require("./authRoutes/register-admin")(router);

require("./authRoutes/delete-user")(router);

require("./authRoutes/send-confirmation-email")(router);
require("./authRoutes/verify-email")(router);
require("./authRoutes/refresh-token")(router);
require("./authRoutes/login")(router);
require("./authRoutes/is-token-valid")(router);
require("./authRoutes/logout")(router);

module.exports = router;
