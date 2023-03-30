/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const User = require('../api/models/user');
const { jwtSecret } = require('../config/vars');
const APIError = require('../utils/api-error');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, jwtSecret, async (err, payload) => {
      if (err || !payload) {
        return res.sendStatus(403);
      }
      const { user } = payload;
      const dbUser = await User.findById(user._id);

      if (dbUser && dbUser.agency.equals(user.agency)) {
        req.user = dbUser;
        return next();
      }
      res.sendStatus(401);
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
