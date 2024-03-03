const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { token, user } = await authService.register(req.body);

    res.cookie('token', token, { sameSite: 'none', secure: true }).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);

    res.cookie('token', token, { sameSite: 'none', secure: true }).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.logout = (req, res) => {
  authService.logout(req, res);
};

exports.profile = async (req, res) => {
  authService.profile(req, res);
};
