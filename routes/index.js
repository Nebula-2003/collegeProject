const express = require("express");
const router = express.Router();
const { userRoutes } = require("../services/users");
const { timeSheetRoutes } = require("../services/timeSheet");
const { subjectsRoutes } = require("../services/subjects");

router.use("/users", userRoutes);
router.use("/timeSheet", timeSheetRoutes);
router.use("/subjects", subjectsRoutes);

router.use("/", (req, res) => {
    res.render("404error");
});

module.exports = router;
