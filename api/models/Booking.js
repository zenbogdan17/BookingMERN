const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, ref: 'Place' },
  checkIn: Date,
  checkOut: Date,
  numberOfGuests: Number,
  totalPrice: Number,
});

module.exports = BookingSchema;
