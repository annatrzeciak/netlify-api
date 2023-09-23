const dbConfig = require("../../config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL_MONGO;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model.js")(mongoose);
db.game = require("./game.model.js")(mongoose);
db.contest = require("./contest.model.js")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
