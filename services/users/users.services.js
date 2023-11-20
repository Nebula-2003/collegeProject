const Model = require("./users.model");

exports.updateMany = async (query, update) => {
    return await Model.updateMany(query, update);
};
