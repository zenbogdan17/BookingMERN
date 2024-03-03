const mongoose = require('mongoose');
const { Schema } = mongoose;
const BookingSchema = require('./Booking');

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bookings: [BookingSchema],
  favorites: [String],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
