"use strict";

const express = require("express");

const authrouter = require("./routes/auth");
const nonAuthRoute = require("./routes/nonAuthRoute.js");
const admainRoute = require("./routes/adminRoute.js");
const errorHandler = require("./error-handler/500");
const notFoundHandler = require("./error-handler/404.js");

const app = express();

app.use(express.json());

app.use(authrouter);
app.use(nonAuthRoute);
app.use(adminRoute);

app.use("*", notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`you in port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
