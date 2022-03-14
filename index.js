"use strict";

require("dotenv").config();

const server = require("./auth/server");

const { db } = require("./auth/models/index");

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3000);
  })

  .catch(console.error);
