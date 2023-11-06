const mongoose = require("mongoose");

// Connect to the database
async function connect() {
    try {
        mongoose.set("debug", true);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log("Connect failure!!!");
    }
}

module.exports = connect;
