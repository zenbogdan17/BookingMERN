const User = require('../models/User');
const jwt = require('jsonwebtoken');

// const jwtSecret = 'dsfuvcoxopciasdqweqpw';

exports.jwtSecret = process.env.JWT_SECRET;

exports.jwtVerification = async (token) => {
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const findUser = await User.findById(userData.id);

  return findUser;
};
