const TimeSheet = require("./timeSheet.model");

async function createTimeSheet(req, res) {
    try {
        res.render("timeSheet/create", { date: new Date(), user: res.user });
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
