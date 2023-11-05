const TimeSheet = require("./timeSheet.model");
const Subject = require("../subjects/subjects.model");
const { DateTime } = require("luxon");

async function createTimeSheet(req, res) {
    try {
        const subjects = await Subject.find({ allowedTeachers: req.user._id }).lean();
        const date = DateTime.now();
        const formattedDate = date.toFormat("d LLL yyyy");
        console.log("🚀 ~ file: timeSheet.controller.js:10 ~ createTimeSheet ~ formattedDate:", formattedDate);
        formattedDate.replace(" ", "-");
        res.render("timeSheet/create", { date: formattedDate, subjects, userName: req.user.name, userId: req.user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// CREATE
async function create(req, res) {
    try {
        const timeSheet = await TimeSheet.create(req.body);
        res.status(201).json(timeSheet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// READ
async function findAll(req, res) {
    try {
        const timeSheet = await TimeSheet.findById(req.params.id).populate({ path: "subject", select: "name" }).populate("teacher");

        if (!timeSheet) {
            // return res.status(404).json({ message: "Time sheet not found" });
        }
        // res.json(timeSheet);
    } catch (error) {
        // res.status(500).json({ message: error.message });
    }
}

// UPDATE
async function update(req, res) {
    try {
        const timeSheet = await TimeSheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!timeSheet) {
            return res.status(404).json({ message: "Time sheet not found" });
        }
        res.json(timeSheet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE
async function deleteTimeSheet(req, res) {
    try {
        const timeSheet = await TimeSheet.findByIdAndDelete(req.params.id);
        if (!timeSheet) {
            return res.status(404).json({ message: "Time sheet not found" });
        }
        res.json({ message: "Time sheet deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTimeSheet,
    create,
    findAll,
    update,
    deleteTimeSheet,
};
