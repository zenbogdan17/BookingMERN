const photoService = require('../services/photoService');
const fs = require('fs');

exports.uploadByLink = async (req, res) => {
  try {
    const result = await photoService.uploadByLink(req);

    res.json(result);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.uploadsPhoto = async (req, res) => {
  try {
    const result = await photoService.uploadsPhoto(req);

    res.json(result);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const result = await photoService.deletePhoto(req);

    res.json(result);
  } catch (error) {
    res.status(422).json(error);
  }
};
