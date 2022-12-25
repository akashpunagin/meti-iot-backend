const router = require("express").Router();
const deviceTenantRouter = require("./customerRoutes/deviceTenants/deviceTenantsRouter");

require("./customerRoutes/get-all")(router);
router.use("/deviceTenants", deviceTenantRouter);

module.exports = router;
