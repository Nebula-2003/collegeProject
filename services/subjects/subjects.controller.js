const Subject = require("./subjects.model");

// GET all subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single subject by ID
const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new subject
const createSubject = async (req, res) => {
    try {
        const subject = await Subject.create({
            name: req.body.name,
            description: req.body.description,
            credits: req.body.credits,
            allowedTeachers: req.body.allowedTeachers,
        });
        res.status(201).json(subject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE an existing subject by ID
const updateSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        subject.name = req.body.name || subject.name;
        subject.description = req.body.description || subject.description;
        subject.credits = req.body.credits || subject.credits;
        const updatedSubject = await subject.save();
        res.status(200).json(updatedSubject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a subject by ID
const deleteSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        await subject.remove();
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubjectById,
    deleteSubjectById,
};
