const express = require('express');
const { getAllBus, getBusById, addBus } = require('../controllers/bus.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const busRouter = express.Router();

busRouter.get('/all', authMiddleware, adminMiddleware, getAllBus);
busRouter.get('/:id', authMiddleware, getBusById);
busRouter.post('/', authMiddleware, adminMiddleware, addBus);

module.exports = busRouter;