const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    credits: { type: Number, required: true },
    allowedTeachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

module.exports = mongoose.model("subjects", SubjectSchema);
