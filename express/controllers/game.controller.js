const db = require("../models");
const {findAllByGame} = require("./contest.controller");
const Game = db.game;
const Contest = db.contest;
const debug = require("debug")("game:controller");

exports.create = (req, res) => {
};

exports.findAll = async (req, res) => {
    try {
        const result = await Game.find({}).populate('contests').populate({
            path: "patron",
            populate: {path: 'roles'}
        }).populate({
            path: "approvedBy", populate: {path: 'roles'}
        }).populate({
            path: 'createdBy', populate: {path: 'roles'}
        });
        debug("Return all games");
        res.status(200).json({
            games: result.map((item) => item),
        // res.status(200).json({
        //     games: result.map(async (item) => {
        //         const contests = await Contest.find({
        //             game: item._id,
        //         },).populate({
        //             path: "patron", populate: {path: 'roles'}
        //         }).populate({
        //             path: "approvedBy", populate: {path: 'roles'}
        //         }).populate({
        //             path: 'createdBy', populate: {path: 'roles'}
        //         });
        //         console.log(contests.length)
        //         return item
        //     }),
        });
    } catch (e) {
        res.status(500).send({
            message: "Error during get all games. " + e.message,
        });
    }
};

exports.confirmGame = async (req, res) => {
};
// Find a single Game with an id
exports.findOne = (req, res) => {
};

// Update a Game by the id in the request
exports.update = (req, res) => {
};

// Delete a Game with the specified id in the request
exports.delete = async (req, res) => {
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
};

// Find all published Games
exports.findAllPublished = (req, res) => {
};
