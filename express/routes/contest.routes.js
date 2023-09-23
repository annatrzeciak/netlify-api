const contest = require("../controllers/contest.controller");
const router = require("express").Router();
const {authJwt} = require("../middlewares");

router.get("/", [authJwt.verifyToken, authJwt.isModerator],
  contest.findAll);
router.get("/:gameid", contest.findAllByGame);
module.exports = router;
