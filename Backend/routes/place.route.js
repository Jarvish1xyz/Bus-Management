const express = require('express');
const { getAllPlace, getPlaceById, addPlace, deletePlace } = require('../controllers/place.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const placeRouter = express.Router();

// placeRouter.get('/all', authMiddleware, adminMiddleware, getAllPlace);
placeRouter.post('/all', authMiddleware, adminMiddleware, getAllPlace);
placeRouter.get('/:id', authMiddleware, getPlaceById);
placeRouter.post('/', authMiddleware, adminMiddleware, addPlace);
placeRouter.delete('/:id', authMiddleware, adminMiddleware, deletePlace);

module.exports = placeRouter;