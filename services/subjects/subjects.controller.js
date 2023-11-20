const { name } = require("ejs");
const Subject = require("./subjects.model");
const UserServices = require("../users/users.services");

// GET all subjects
const getAllSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find().populate("allowedTeachers");
        console.log("🚀 ~ file: subjects.controller.js:15 ~ subjects=subjects.map ~ subjects:", subjects);
        res.render("subjects/listing", { subjects: subjects, showElement: true });
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
        console.log("🚀 ~ file: subjects.controller.js:38 ~ createSubject ~ subject:", subject);
        const teachers = await UserServices.updateMany({ _id: { $in: req.body.allowedTeachers } }, { $push: { subjects: subject._id } });
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
