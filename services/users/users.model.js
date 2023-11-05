const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: {
            type: String,
            enum: ["admin", "teacher", "hod"],
            required: true,
        },
        password: { type: String, required: true },
        subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }],
    },
    { timestamps: true, collection: "users" }
);

usersSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    console.log("🚀 ~ file: users.model.js:22 ~ user:", user);
    if (!user) {
        throw new Error("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
    }
    return user;
};

usersSchema.statics.generateToken = async function (query) {
    const user = await this.findOne(query);
    if (!user) {
        throw new Error("Invalid login credentials");
    }
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET
    );
    return token;
};

usersSchema.statics.verifyToken = async function (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.findOne({
        _id: decoded._id,
    });
    if (!user) {
        throw new Error("Invalid login credentials");
    }
    return user;
};

module.exports = mongoose.model("users", usersSchema);
