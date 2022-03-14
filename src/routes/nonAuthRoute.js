'use strict';
const express = require('express');
const {food} = require('../models/index');
const router = express.Router();

router.get('/food', handleGetAll);
router.get('/food/:category', handleGeAllbyCat);
router.get("/", (req, res) => {
  res.status(200).send("home");
});

async function handleGetAll(req, res) {
  let allRecords = await food.get();
  res.status(200).json(allRecords);
}

async function handleGeAllbyCat(req, res) {
  const category = req.params.category;
  let allRecord = await food.getByCat(category);
  res.status(200).json(allRecord);
}




module.exports = router;