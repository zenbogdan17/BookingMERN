const Place = require('../models/Place');
const placesService = require('../services/placesService');

exports.addPlace = async (req, res) => {
  try {
    const response = await placesService.addPlace(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const response = await placesService.getPlace(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e.message);
  }
};

exports.getAllPlaces = async (_, res) => {
  try {
    const response = await Place.find();

    res.json(response);
  } catch (e) {
    res.status(422).json(e.message);
  }
};

exports.getPlacesById = async (req, res) => {
  try {
    const response = await placesService.getPlacesById(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e.message);
  }
};

exports.editPlace = async (req, res) => {
  try {
    const response = await placesService.editPlace(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e.message);
  }
};

exports.bookingPlace = async (req, res) => {
  try {
    const response = await placesService.bookingPlace(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.getUserBooking = async (req, res) => {
  try {
    const response = await placesService.getUserBooking(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.removeBooking = async (req, res) => {
  try {
    const response = await placesService.removeBooking(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.favoritePlace = async (req, res) => {
  try {
    const response = await placesService.favoritePlace(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.getFavorite = async (req, res) => {
  try {
    const response = await placesService.getFavorite(req);

    res.json(response);
  } catch (e) {
    res.status(422).json(e);
  }
};
