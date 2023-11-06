const User = require("./users.model");
const bcrypt = require("bcrypt");
const Subjects = require("../subjects/subjects.model");
const TimeSheetServices = require("../timeSheet/timeSheet.services");
const { DateTime } = require("luxon");

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
        res.render("register", { showElement: true });
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
        res.redirect("/users");
    } catch (error) {
        res.status(400).send(error);
    }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find({}).populate({ path: "subjects" }).lean();
        console.log("🚀 ~ file: users.controller.js:46 ~ exports.getAllUsers= ~ users:", users);
        res.render("userslisting", { users: users, showElement: true });
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
    try {
        const token = req.cookies.jwt;
        console.log("🚀 ~ file: users.controller.js:56 ~ exports.getLoginPage= ~ token:", token);
        if (!token || token === "undefined" || token === "null") {
            return res.render("login");
        } else {
            const user = await User.verifyToken(token);
            if (!user) {
                return res.render("login");
            }
            return res.redirect("dashboard");
        }
    } catch (error) {
        console.log("🚀 ~ file: users.controller.js:73 ~ exports.getLoginPage= ~ error:", error);
        res.redirect("/users/login?message=Session expired! Please login again.");
    }
};

//Login a user
exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await User.generateToken({ _id: user._id });
        console.log("🚀 ~ file: users.controller.js:56 ~ exports.loginUser= ~ token:", token);
        res.cookie("jwt", token, { httpOnly: true });
        return res.redirect("/users/dashboard");
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

exports.userDashboard = async (req, res) => {
    let timeSheet = await TimeSheetServices.find({ teacher: req.user._id }, [
        { path: "subject", select: "name" },
        { path: "teacher", select: "name" },
    ]);
    console.log("🚀 ~ file: users.controller.js:143 ~ exports.userDashboard= ~ timeSheet:", timeSheet);

    timeSheet = timeSheet.map((item) => {
        const date = DateTime.fromJSDate(new Date(item.date));
        const formattedDate = date.toFormat("LLL dd yyyy");

        const startTime = DateTime.fromJSDate(new Date(item.startTime));
        const formattedStartTime = startTime.toFormat("HH:mm:ss");

        const endTime = DateTime.fromJSDate(new Date(item.endTime));
        const formattedEndTime = endTime.toFormat("HH:mm:ss");

        return {
            ...item,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };
    });

    console.log(timeSheet); // Outputs date in the format: 2022 Jan 01
    // timeSheet = timeSheet.map((item) => {
    //     return {
    //         ...item._doc,
    //         date: new Date(item.date).toLocaleDateString(),
    //     };
    // });
    console.log("🚀 ~ file: users.controller.js:139 ~ exports.userDashboard= ~ timeSheet:", timeSheet);
    if (req.user.role === "admin") {
        return res.render("dashboard", { user: req.user, message: null, showElement: true, tableData: timeSheet });
    }
    res.render("dashboard", { user: req.user, message: null, showElement: false, tableData: timeSheet });
};

// Logout a user
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect("/users/login");
    } catch (error) {
        console.log("🚀 ~ file: users.controller.js:73 ~ exports.logoutUser= ~ error:", error);
        res.redirect("/users/login?message=Session expired! Please login again.");
    }
};
