'use strict';

const express = require('express');
const routers = express.Router();
const { users } = require('../models/index');
// const basicAuth = require('../middlewares/basicAuth.js')
const bearerAuth = require('../middlewares/bearerAuth.js')
const aclMid = require('../middlewares/acl.js')
const {food} = require('../models/index');
const router = require('./nonAuthRoute');


routers.get('/users', bearerAuth, aclMid('delete'), async (req, res, next) => {
    const userRecords = await users.findAll({});
    // const usersList = userRecords.map(user => user);
    res.status(200).json(userRecords);
  });

  routers.delete('/users/:id' , bearerAuth , aclMid('delete'), async (req, res, next)=>{
    let id = req.params.id;
    
    await users.destroy({ where: { id : id } });
    res.status(200).send('user deleted successfully');
  });

  routers.put('/users/:id' , bearerAuth , aclMid('update') , async (req , res , next )=>{
 let id = req.params.id;
  let updated = req.body;
  await users.update(updated , { where: { id : id } });
  let updatedUser = await users.findOne({ where: { id : id } })
    res.status(201).json(updatedUser);
  })


  routers.post('/food' , bearerAuth , aclMid('create'), async (req, res, next) =>{
   let createdFood = req.body;
    await food.create(req.body);
    res.status(201).json(createdFood);

  })

  routers.get('/food' , bearerAuth , aclMid('read'), async (req, res, next) =>{
   res.status(200).json(food.get());
   })


   routers.get('/food/:id' , bearerAuth , aclMid('read'), async (req, res, next) =>{
       let id = req.params.id;
    res.status(200).json(food.get(id));
    })

    router.put('/food/:id',bearerAuth , aclMid('read'),async (req, res, next)=>{
        let id = req.params.id;
        let update = req.body
        let output = await food.update(id , update)

        res.status(201).json(output)


    })



  module.exports = routers;