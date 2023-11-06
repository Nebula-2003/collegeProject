const Model = require("./timeSheet.model");

exports.create = async (obj) => {
    return await Model.create(obj);
};

exports.findById = async (id) => {
    return await Model.findById(id).lean();
};

exports.find = async (query, populate) => {
    return await Model.find(query).populate(populate).lean().sort({ createdAt: -1 });
};

exports.findAll = async (query) => {
    return await Model.find(query).lean();
};
