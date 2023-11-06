const { query } = require("express");
const Model = require("./timeSheet.model");

exports.create = async (req, res) => {
    return await Model.create(req.body);
};

exports.findById = async (id) => {
    return await Model.findById(id).lean();
};

exports.find = async (query, populate) => {
    return await Model.find(query).populate(populate).lean();
};

exports.findAll = async (query) => {
    return await Model.find(query).lean();
};
