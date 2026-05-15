const express = require('express');
const { getAllBus, getBusById, addBus, deleteBus, getForDriver, updateBus } = require('../controllers/bus.controller');
const { authMiddleware, adminMiddleware, driverMiddleware } = require('../middleware/auth.middleware');
const busRouter = express.Router();

busRouter.post('/all', authMiddleware, adminMiddleware, getAllBus);
busRouter.post('/assign-driver', authMiddleware, driverMiddleware, getForDriver);
busRouter.post('/', authMiddleware, adminMiddleware, addBus);
busRouter.post('/:id', authMiddleware, getBusById);
busRouter.delete('/:id', authMiddleware, adminMiddleware, deleteBus);
busRouter.patch('/:id', authMiddleware, adminMiddleware, updateBus);

module.exports = busRouter;