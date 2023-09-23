const game = require("../controllers/game.controller");
const router = require("express").Router();
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  router.get("/",  game.findAll);
  router.put(
    "/:gameid/confirm",
    [authJwt.verifyToken, authJwt.isModerator],
    game.confirmGame
  );
  router.delete(
    "/:gameid",
    [authJwt.verifyToken, authJwt.isAdmin],
    game.delete
  );

  app.use("/api/games", router);
  app.use('/.netlify/functions/server/api/games', router);
};
