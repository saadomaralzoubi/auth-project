'use strict';
require('dotenv').config();
const userModel = require('./users.js');
const Collection = require('./lib/data-collection.js');
const foodModel = require('./food')

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
let DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const food = foodModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  user: userModel(sequelize, DataTypes),
  food: new Collection(food)

};