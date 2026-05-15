const express = require('express');
const { getAllPlace, getPlaceById, addPlace, deletePlace, updatePlace } = require('../controllers/place.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const placeRouter = express.Router();

// placeRouter.get('/all', authMiddleware, adminMiddleware, getAllPlace);
placeRouter.post('/all', authMiddleware, adminMiddleware, getAllPlace);
placeRouter.post('/', authMiddleware, adminMiddleware, addPlace);
placeRouter.post('/:id', authMiddleware, getPlaceById);
placeRouter.delete('/:id', authMiddleware, adminMiddleware, deletePlace);
placeRouter.patch('/:id', authMiddleware, adminMiddleware, updatePlace);

module.exports = placeRouter;