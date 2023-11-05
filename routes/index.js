const express = require("express");
const router = express.Router();
// const {} = require("../services/timeSheet");
// const {} = require("../services/timeSheet");
const { userRoutes } = require("../services/users");

router.use("/users", userRoutes);

module.exports = router;
