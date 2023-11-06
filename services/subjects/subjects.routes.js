const express = require("express");
const router = express.Router();
const subjectsController = require("./subjects.controller");
const { guard } = require("../../helper/guard");

// GET all subjects
router.get("/", subjectsController.getAllSubjects);

// GET form to create subjects
router.get("/create", guard(["admin", "hod"]), subjectsController.getAllSubjects);

// GET a single subject by ID
// router.get('/:id', subjectsController.getSubjectById);

// CREATE a new subject
router.post("/", guard(["admin", "hod"]), subjectsController.createSubject);

// UPDATE an existing subject by ID
router.put("/:id", subjectsController.updateSubjectById);

// DELETE a subject by ID
router.delete("/:id", subjectsController.deleteSubjectById);

module.exports = router;
