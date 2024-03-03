const Place = require('../models/Place');
const User = require('../models/User');
const { jwtVerification } = require('../utils/jwtUtils');

exports.addPlace = async (req) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      photos,
      mainPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const findUser = await jwtVerification(token);

    if (!findUser) throw new Error('User not found');

    const { _id } = findUser;

    const placeDoc = await Place.create({
      owner: _id,
      title,
      address,
      photos,
      mainPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    if (!placeDoc) throw new Error("Can't create new place. DB error");

    return placeDoc;
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.getPlace = async (req) => {
  const { token } = req.cookies;

  const { _id } = await jwtVerification(token);

  if (!_id) throw new Error('User not found');

  const findPlaces = await Place.find({ owner: _id });

  return findPlaces;
};

exports.getPlacesById = async (req) => {
  const { id } = req.params;

  const findPlace = await Place.findById(id);

  return findPlace;
};

exports.editPlace = async (req) => {
  const { id } = req.params;
  const { body } = req;
  const { token } = req.cookies;

  const { _id } = await jwtVerification(token);
  const { owner } = await Place.findById(id);

  if (_id.toString() !== owner.toString()) {
    throw new Error('You not owner this place');
  }

  const result = await Place.findByIdAndUpdate(id, body, { new: true });

  return result;
};

exports.bookingPlace = async (req) => {
  const { place, checkIn, checkOut, numberOfGuests, userId, totalPrice } =
    req.body;

  const newBookingData = {
    place: place._id,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    numberOfGuests: numberOfGuests,
    totalPrice: totalPrice,
  };

  const user = await User.findById(userId);
  const findPlace = await Place.findById(place._id);

  user.bookings.push(newBookingData);
  findPlace.bookings.push(newBookingData);

  await user.save();
  await findPlace.save();

  return user;
};

exports.getUserBooking = async (req) => {
  const { token } = req.cookies;

  console.log(token);

  const { _id } = await jwtVerification(token);
  if (!_id) throw new Error('User not found');

  const { bookings } = await User.findById(_id);
  const ids = bookings.map((obj) => obj.place);

  let places = await Place.find({ _id: { $in: ids } });

  let responsePlace = [];

  for (let i = 0; i < places.length; i++) {
    responsePlace.push({
      ...places[i]._doc,
      bookingId: bookings[i]._id,
      checkIn: bookings[i].checkIn,
      checkOut: bookings[i].checkOut,
      totalPrice: bookings[i].totalPrice,
      night: bookings[i].numberOfGuests,
    });
  }

  return responsePlace;
};

exports.removeBooking = async (req) => {
  const { token } = req.cookies;
  const { id: bookingId } = req.params;

  const { _id } = await jwtVerification(token);

  const user = await User.findById(_id);

  const bookingInfo = user.bookings.find((booking) => booking.id === bookingId);

  user.bookings = user.bookings.filter((booking) => booking._id === bookingId);

  await user.save();

  const place = await Place.findById(bookingInfo.place);

  place.bookings = place.bookings.filter(
    (booking) =>
      booking.checkIn === bookingInfo.checkIn &&
      booking.checkOut === bookingInfo.checkOut
  );

  await place.save();

  return user;
};

exports.favoritePlace = async (req) => {
  const { token } = req.cookies;
  const { id: placeId } = req.params;

  const { _id } = await jwtVerification(token);
  if (!_id) throw new Error('User not found');

  const user = await User.findById(_id);

  const isFound = user.favorites.find((id) => id === placeId);

  if (isFound) {
    user.favorites = user.favorites.filter((id) => id !== placeId);

    await user.save();
  } else {
    user.favorites.push(placeId);
    await user.save();
  }

  return user;
};

exports.getFavorite = async (req) => {
  const { token } = req.cookies;

  const { _id } = await jwtVerification(token);
  if (!_id) throw new Error('User not found');

  const { favorites } = await User.findById(_id);

  let places = await Place.find({ _id: { $in: favorites } });

  return places;
};
