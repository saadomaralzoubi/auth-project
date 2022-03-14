
'use strict';
require('dotenv').config();
const { users } = require('../models/index')
const SECRET = process.env.SECRET || "FIFA"

module.exports = async (req, res, next) => {

    try {

        if (!req.headers.authorization) { _authError() }

        const token = req.headers.authorization.split(' ').pop();
        const validUser = await users.authenticateToken(token);
        req.user = validUser;
        req.token = validUser.token;
        next();

    } catch (e) {
        next('Invalid Login');
    }

}


