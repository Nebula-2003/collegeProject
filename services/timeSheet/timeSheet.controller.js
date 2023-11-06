const TimeSheetServices = require("./timeSheet.services");
const Subject = require("../subjects/subjects.model");
const { DateTime } = require("luxon");

async function createTimeSheet(req, res) {
    try {
        const subjects = await Subject.find({ allowedTeachers: req.user._id }).lean();
        const date = DateTime.now();
        const formattedDate = date.toFormat("d LLL yyyy");
        console.log("🚀 ~ file: timeSheet.controller.js:10 ~ createTimeSheet ~ formattedDate:", formattedDate);
        formattedDate.replace(" ", "-");
        let showElement = false;
        if (req.user.role === "admin") {
            showElement = true;
        }
        res.render("timeSheet/create", { date: formattedDate, subjects, userName: req.user.name, userId: req.user._id, message: null, showElement });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// CREATE
async function create(req, res) {
    try {
        let startTime = new Date();
        let endTime = new Date();
        startTime.setHours(req.body.startHour);
        startTime.setMinutes(req.body.startMinute);
        endTime.setHours(req.body.endHour);
        endTime.setMinutes(req.body.endMinute);
        let durationInMin = (endTime - startTime) / 1000 / 60;
        if (durationInMin < 0) {
            const subjects = await Subject.find({ allowedTeachers: req.user._id }).lean();
            const date = DateTime.now();
            const formattedDate = date.toFormat("d LLL yyyy");
            console.log("🚀 ~ file: timeSheet.controller.js:10 ~ createTimeSheet ~ formattedDate:", formattedDate);
            formattedDate.replace(" ", "-");
            return res.render("timeSheet/create", {
                date: formattedDate,
                subjects,
                userName: req.user.name,
                userId: req.user._id,
                message: "End time must be after start time",
            });
        }
        let obj = {
            subject: req.body.subject,
            teacher: req.body.teacher,
            date: new Date(),
            startTime,
            endTime,
            durationInMin,
        };
        console.log("🚀 ~ file: timeSheet.controller.js:54 ~ create ~ obj:", obj);
        const timeSheet = await TimeSheetServices.create(obj);
        res.redirect("/users/dashboard");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// READ
async function findAll(req, res) {
    try {
        const timeSheet = await TimeSheetServices.findById(req.params.id).populate({ path: "subject", select: "name" }).populate("teacher");

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
        const timeSheet = await TimeSheetServices.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const timeSheet = await TimeSheetServices.findByIdAndDelete(req.params.id);
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
