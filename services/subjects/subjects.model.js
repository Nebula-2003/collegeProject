const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    allowedTeachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
});
