const router = require("express").Router();
const deviceTenentRouter = require("./customerRoutes/deviceTenents/deviceTenentsRouter");

require("./customerRoutes/get-all")(router);
router.use("/deviceTenents", deviceTenentRouter);

module.exports = router;
