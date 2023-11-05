
const express = require('express');
const router = express.Router();
const subjectsController = require('./subjects.controller');

// GET all subjects
router.get('/', subjectsController.getAllSubjects);

// GET a single subject by ID
router.get('/:id', subjectsController.getSubjectById);

// CREATE a new subject
router.post('/', subjectsController.createSubject);

// UPDATE an existing subject by ID
router.put('/:id', subjectsController.updateSubjectById);

// DELETE a subject by ID
router.delete('/:id', subjectsController.deleteSubjectById);

module.exports = router;
