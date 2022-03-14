'use strict';

const express = require('express');
const routers = express.Router();
const { users } = require('../models/index');
const basicAuth = require('../middlewares/basicAuth.js')
const bearerAuth = require('../middlewares/bearerAuth.js')
const cabablitesMid = require('../middlewares/acl.js')

routers.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});
routers.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

routers.get('/users', bearerAuth, cabablitesMid('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const usersList = userRecords.map(user => user.username);
  res.status(200).json(usersList);
});

module.exports = routers;
