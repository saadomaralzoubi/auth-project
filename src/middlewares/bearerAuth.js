"use strict";
const { user } = require("../models/index");
const JWT = require("jsonwebtoken");
const SECRET = process.env.SECRET || "FIFA";

const bearerAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let barrierToken = req.headers.authorization.split(" ");
      let token = barrierToken.pop();
      if (token) {
        const userToken = JWT.verify(token, SECRET);

        const User = await user.findOne({
          where: { username: userToken.username },
        });
        console.log(userToken);
        if (User) {
          req.token = userToken;
          req.User = User;
          next();
        } else {
          res.status(403).send("invalid user");
        }
      }
    } catch (error) {
      res.status(403).send("invalid Token");
    }
  } else {
    res.status(403).send("Empty Token");
  }
};

module.exports = bearerAuth;
