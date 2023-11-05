const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const { validationParm } = require("../../helper/validation");
const { guard } = require("../../helper/guard");

// Register a new user
router.get("/register", guard(["admin"]), usersController.registerUser);

// Create a new user
router.post("/", usersController.createUser);

// Retrieve all users
router.get("/", usersController.getAllUsers);

//Get Login page
router.get("/login", usersController.getLoginPage);

//Login a user
router.post("/login", usersController.loginUser);

// User Dashboard
router.get("/dashboard", guard(["teacher", "hod", "admin"]), usersController.userDashboard);

// Logout a user
router.get("/logout", usersController.logoutUser);

// Retrieve a single user with userId
router.get("/:userId", validationParm, usersController.getUserById);

// Update a user with userId
router.put("/:userId", validationParm, usersController.updateUserById);

// Delete a user with userId
router.delete("/:userId", validationParm, usersController.deleteUserById);

module.exports = router;
