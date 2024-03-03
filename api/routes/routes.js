const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');
const placesController = require('../controllers/placesController');
const photosMiddleware = require('../middleware/photosMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.profile);

router.post(
  '/upload',
  photosMiddleware.array('photos', 100),
  photoController.uploadsPhoto
);
router.post('/upload-by-link', photoController.uploadByLink);
router.delete('/delete_photo', photoController.deletePhoto);

router.post('/user-places', placesController.addPlace);
router.get('/user-places', placesController.getPlaces);
router.get('/user-booking', placesController.getUserBooking);

router.get('/places', placesController.getAllPlaces);
router.get('/places/:id', placesController.getPlacesById);
router.put('/places/:id', placesController.editPlace);
router.post('/booking', placesController.bookingPlace);
router.delete('/booking/:id', placesController.removeBooking);

router.get('/favorite', placesController.getFavorite);
router.post('/favorite/:id', placesController.favoritePlace);

module.exports = router;
