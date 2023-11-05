const express = require("express");
const router = express.Router();
// const {} = require("../services/timeSheet");
// const {} = require("../services/timeSheet");
const { userRoutes } = require("../services/users");
const {timeSheetRoutes} = require("../services/timeSheet");

router.use("/users", userRoutes);
router.use("/timeSheet", timeSheetRoutes);


module.exports = router;
