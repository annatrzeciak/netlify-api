const contest = require("../controllers/contest.controller");
const router = require("express").Router();
const {authJwt} = require("../middlewares");

module.exports = (app) => {
  router.get("/", [authJwt.verifyToken, authJwt.isModerator],
    contest.findAll);
  router.get("/:gameid", contest.findAllByGame);

  app.use("/api/contests", router);
  app.use('/.netlify/functions/server/api/contests', router);
};
