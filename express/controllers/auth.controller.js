const debug = require("debug")("auth:controller");
const config = require("../../config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    debug("Passwords do not match");
    res.status(400).send({
      message: "Passwords do not match",
    });
    return;
  }
  const { email, password, displayName, avatar, phone } = req.body;
  const user = new User({
    email,
    password: bcrypt.hashSync(password, 8),
    displayName,
    avatar,
    phone,
  });
  user.updatedBy = user._id;

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  console.log(req.body.email)
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ _id: user._id }, config.SECRET, {
        expiresIn: 86400, // 24 hours
      });
      const userJson = user.toJSON();

      res.status(200).send({
        accessToken: token,
        user: { ...userJson, roles: userJson.roles.map((role) => role.name) },
      });
    });
};

exports.user = (req, res) => {
  if (!req.userId) {
    return res.status(401).send("unauthorized");
  }
  User.findOne({ _id: req.userId })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const { displayName, email, phone, avatar, roles, approved, createdAt } =
        user;

      return res.status(200).send({
        user: {
          _id: req.userId,
          email,
          displayName,
          phone,
          avatar,
          roles: roles.map((role) => role.name),
          approved,
          createdAt,
        },
      });
    });

  return res.status(500);
};
