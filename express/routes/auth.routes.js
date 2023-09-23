const { verifySignUp, authJwt } = require("../middlewares");
const auth = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = function (app) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/register",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    auth.register
  );

  router.post("/login", auth.login);
  router.get("/user", [authJwt.verifyToken], auth.user);
  router.get("/auth", [authJwt.verifyToken], auth.user);

  app.use("/api/auth", router);
  app.use('/.netlify/functions/server/api/auth', router);
};
