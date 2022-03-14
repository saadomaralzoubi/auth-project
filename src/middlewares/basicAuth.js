"use strict";
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { user } = require("../models/index");
const JWT = require("jsonwebtoken");
const SECRET = process.env.SECRET || "FIFA";
const basicAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let basicHeeaderParts = req.headers.authorization.split(" ");
      let encoded = basicHeeaderParts.pop();
      let decoded = base64.decode(encoded);
      let [username, password] = decoded.split(":");

      const User = await user.findOne({ where: { username: username } });
      const pwd = await bcrypt.compare(password, User.password);
      if (pwd) {
        req.User = User;
        console.log(req.User);

        let newToken = JWT.sign({ username: User.username }, SECRET, {
          expiresIn: "900s",
        });
        User.token = newToken;
        res.status(200).json(User);
      } else {
        res.status(403).send("invalid  Password");
      }
    }
  } catch (error) {
    res.status(403).send("invalid  Username");
  }
};

module.exports = basicAuth;
