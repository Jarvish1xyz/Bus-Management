const express = require('express');
const { getAllPlace, getPlaceById, addPlace } = require('../controllers/place.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const placeRouter = express.Router();

placeRouter.get('/all', authMiddleware, adminMiddleware, getAllPlace);
placeRouter.get('/:id', authMiddleware, getPlaceById);
placeRouter.post('/', authMiddleware, adminMiddleware, addPlace);

module.exports = placeRouter;