'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('food', {
name: { type: DataTypes.STRING, required: true },
price : {type: DataTypes.STRING , required : true},
category : {type: DataTypes.STRING, required : true}
});

module.exports = foodModel;