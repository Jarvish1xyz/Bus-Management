const express = require('express');
const { getAllBus, getBusById, addBus, deleteBus } = require('../controllers/bus.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const busRouter = express.Router();

busRouter.post('/all', authMiddleware, adminMiddleware, getAllBus);
busRouter.get('/:id', authMiddleware, getBusById);
busRouter.post('/', authMiddleware, adminMiddleware, addBus);
busRouter.delete('/:id', authMiddleware, adminMiddleware, deleteBus);

module.exports = busRouter;