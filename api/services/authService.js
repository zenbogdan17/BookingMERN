const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtVerification } = require('../utils/jwtUtils');

exports.register = async ({ name, email, password }) => {
  const bcryptSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
  const userDoc = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign(
    { email: userDoc.email, id: userDoc._id, name: userDoc.name },
    process.env.JWT_SECRET
  );

  return { token, user: userDoc };
};

exports.login = async ({ email, password }) => {
  const userDoc = await User.findOne({ email });

  if (!userDoc) throw { status: 'user not found' };

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (!passOk) throw { status: 'password not OK!' };

  const token = jwt.sign(
    { email: userDoc.email, id: userDoc._id, name: userDoc.name },
    process.env.JWT_SECRET
  );

  return { token, user: userDoc };
};

exports.logout = (req, res) => {
  res.cookie('token', '').json(true);
};

exports.profile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const findUser = await jwtVerification(token);

    if (findUser) {
      const { name, email, _id, bookings, favorites } = findUser;
      res.json({ name, email, _id, bookings, favorites });
    } else {
      res.json({});
    }
  } catch (e) {
    res.status(422).json(e);
  }
};
