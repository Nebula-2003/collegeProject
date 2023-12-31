const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSheetSchema = new Schema(
    {
        subject: {
            type: Schema.Types.ObjectId,
            ref: "subjects",
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        date: { type: Date, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        durationInMin: { type: Number, required: true },
    },
    { timestamps: true, collection: "timeSheets" }
);
const Model = mongoose.model("timeSheets", timeSheetSchema);
module.exports = Model;
