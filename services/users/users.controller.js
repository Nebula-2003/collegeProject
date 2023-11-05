const User = require("./users.model");
const bcrypt = require("bcrypt");

// get registration page
exports.registerUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        console.log("🚀 ~ file: users.controller.js:7 ~ exports.registerUser= ~ token:", token);
        if (!token || token === "undefined" || token === "null") {
            return res.redirect("/users/login");
        }
        const user = await User.verifyToken(token);
        if (!user) {
            return res.redirect("/users/login?message=Session expired! Please login again.");
        }
        if (user.role !== "admin") {
            return res.redirect("/users/login?message=You are not authorized to access this page.");
        }
        res.render("register");
    } catch (error) {
        console.log("🚀 ~ file: users.controller.js:21 ~ exports.registerUser= ~ error:", error);
        res.redirect("/users/login?message=Session expired! Please login again.");
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        let password = req.body.password;
        let hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Retrieve a single user with userId
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Get Login page
exports.getLoginPage = async (req, res) => {
    res.render("login");
};

//Login a user
exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await User.generateToken({ _id: user._id });
        console.log("🚀 ~ file: users.controller.js:56 ~ exports.loginUser= ~ token:", token);
        res.cookie("jwt", token, { httpOnly: true });
        return res.render("dashboard", { user, message: null });
    } catch (error) {
        console.log("🚀 ~ file: users.controller.js:51 ~ exports.loginUser= ~ error:", error);
        res.status(400).send({ error: error.message });
    }
};

// Update a user with userId
exports.updateUserById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [/*'name', 'email', */ "password"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const user = await User.findById(req.params.userId);
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user with userId
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
