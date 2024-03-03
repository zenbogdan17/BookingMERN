const path = require('path');
const fs = require('fs');
const download = require('image-downloader');
const { jwtVerification } = require('../utils/jwtUtils');
const Place = require('../models/Place');

exports.uploadByLink = async (req) => {
  try {
    const { link } = req.body;

    const parentDir = path.resolve(__dirname, '..');
    const newName = 'photo_' + Date.now() + '.jpg';

    await download.image({
      url: link,
      dest: path.join(parentDir, 'uploads', newName),
    });

    return newName;
  } catch (error) {
    console.error('Error downloading image:', error);
    return new Error('Failed to download image');
  }
};

exports.uploadsPhoto = async (req) => {
  try {
    const { id } = req.body;
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, filename } = req.files[i];

      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];

      const newPath = path + '.' + ext;

      fs.renameSync(path, newPath);

      uploadedFiles.push(filename + '.' + ext);
    }

    if (id) {
      const findPlaces = await Place.findById(id);

      findPlaces.photos.push(...uploadedFiles);

      await findPlaces.save();
    }

    return uploadedFiles;
  } catch (error) {
    console.error('Error downloading image:', error);
    return new Error('Failed to uploads image');
  }
};

exports.deletePhoto = async (req) => {
  const { token } = req.cookies;
  const { idPlace, namePhoto } = req.body;

  if (idPlace) {
    const { _id } = await jwtVerification(token);

    if (!_id) throw new Error('User not found');

    const findPlaces = await Place.findById(idPlace);

    if (!findPlaces) throw new Error('Place not found');

    const index = findPlaces.photos.indexOf(namePhoto);
    if (index !== -1) {
      findPlaces.photos.splice(index, 1);

      await findPlaces.save();
    }
  }

  const photoPath = path.join(__dirname, '../uploads', namePhoto);
  fs.unlinkSync(photoPath);
};
