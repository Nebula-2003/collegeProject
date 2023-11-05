const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");

// Register a new user
router.get("/register", usersController.registerUser);

// Create a new user
router.post("/", usersController.createUser);

// Retrieve all users
router.get("/", usersController.getAllUsers);

//Get Login page
router.get("/login", usersController.getLoginPage);

//Login a user
router.post("/login", usersController.loginUser);

// Retrieve a single user with userId
router.get("/:userId", usersController.getUserById);

// Update a user with userId
router.put("/:userId", usersController.updateUserById);

// Delete a user with userId
router.delete("/:userId", usersController.deleteUserById);

module.exports = router;
