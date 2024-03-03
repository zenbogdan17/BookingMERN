const mongoose = require('mongoose');
const BookingSchema = require('./Booking');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [String],
  mainPhoto: String,
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: String,
  price: String,
  bookings: [BookingSchema],
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = placeSchema;
module.exports = PlaceModel;
