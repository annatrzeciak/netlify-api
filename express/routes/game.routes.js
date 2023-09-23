const game = require("../controllers/game.controller");
const router = require("express").Router();
const {authJwt} = require("../middlewares");

router.get("/", game.findAll);
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
module.exports = router;
