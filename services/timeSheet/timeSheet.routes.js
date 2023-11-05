const express = require("express");
const router = express.Router();
const timeSheetController = require("./timeSheet.controller");
const { guard } = require("../../helper/guard");

// Create a new timeSheet - Get
router.get("/create", guard(["teacher"]), timeSheetController.createTimeSheet);

// Create a new timeSheet
router.post("/", timeSheetController.create);

// Retrieve all timeSheets
router.get("/", timeSheetController.findAll);

// Retrieve a single timeSheet with id
// router.get("/:id", timeSheetController.findOne);

// Update a timeSheet with id
router.put("/:id", timeSheetController.update);

// Delete a timeSheet with id
router.delete("/:id", timeSheetController.deleteTimeSheet);

module.exports = router;
