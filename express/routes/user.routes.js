const user = require("../controllers/user.controller");
const router = require("express").Router();
const {authJwt} = require("../middlewares");

router.get("/", [authJwt.verifyToken, authJwt.isModerator], user.findAll);
router.put(
  "/:userid/confirm",
  [authJwt.verifyToken, authJwt.isModerator],
  user.confirmUser
);
router.delete(
  "/:userid",
  [authJwt.verifyToken, authJwt.isAdmin],
  user.delete
);

module.exports = router;
