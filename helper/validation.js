const mongoose = require("mongoose");

function isValidMongoId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.validationParm = (req, res, next) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
        return res.render("404error");
    }
    next();
};
