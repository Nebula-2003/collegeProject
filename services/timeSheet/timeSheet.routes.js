const express = require("express");
const router = express.Router();
const timeSheetController = require("./timeSheet.controller");
const { guard } = require("../../helper/guard");
const { validationParm } = require("../../helper/validation");
// Create a new timeSheet - Get
router.get("/create", guard(["teacher"]), timeSheetController.createTimeSheet);

// Create a new timeSheet
router.post("/", guard(["teacher"]), timeSheetController.create);

// Retrieve all timeSheets
// router.get("/", timeSheetController.findAll);

// Retrieve a single timeSheet with id
// router.get("/:id", timeSheetController.findOne);

// Update a timeSheet with id
router.put("/:id", guard(["hod", "admin"]), validationParm, timeSheetController.update);

// Delete a timeSheet with id
router.delete("/:id", guard(["hod", "admin"]), validationParm, timeSheetController.deleteTimeSheet);

module.exports = router;
