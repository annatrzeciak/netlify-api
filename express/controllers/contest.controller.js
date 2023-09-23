const db = require("../models");
const Contest = db.contest;
const debug = require("debug")("contest:controller");

exports.create = (req, res) => {
};
exports.findAllByGame = async (req, res) => {
    try {
        const result = await Contest.find({
            game: req.params.gameid,
        },).populate('game').populate({
            path: "patron", populate: {path: 'roles'}
        }).populate({
            path: "approvedBy", populate: {path: 'roles'}
        }).populate({
            path: 'createdBy', populate: {path: 'roles'}
        });
        debug("Return all contests");
        res.status(200).json({
            contests: result.map((item) => item),
        });
    } catch (e) {
        res.status(500).send({
            message: "Error during get all contests. " + e.message,
        });
    }
};
exports.findAll = async (req, res) => {
    try {
        const result = await Contest.find({}).populate('game').populate({
            path: "patron", populate: {path: 'roles'}
        }).populate({
            path: "approvedBy", populate: {path: 'roles'}
        }).populate({
            path: 'createdBy', populate: {path: 'roles'}
        });
        debug("Return all contests");
        res.status(200).json({
            contests: result.map((item) => item),
        });
    } catch (e) {
        res.status(500).send({
            message: "Error during get all contests. " + e.message,
        });
    }
};

exports.confirmContest = async (req, res) => {
};
// Find a single Contest with an id
exports.findOne = (req, res) => {
};

// Update a Contest by the id in the request
exports.update = (req, res) => {
};

// Delete a Contest with the specified id in the request
exports.delete = async (req, res) => {
};

// Delete all Contests from the database.
exports.deleteAll = (req, res) => {
};

// Find all published Contests
exports.findAllPublished = (req, res) => {
};
