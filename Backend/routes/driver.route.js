const express = require('express');
const { getAllDriver, getDriverById, addDriver, deleteDriver, updateDriver, updateDriverProfile } = require('../controllers/driver.controller');
const { authMiddleware, adminMiddleware, driverMiddleware } = require('../middleware/auth.middleware');
const driverRouter = express.Router();

driverRouter.post('/all', authMiddleware, adminMiddleware, getAllDriver);
driverRouter.post('/', authMiddleware, adminMiddleware, addDriver);
driverRouter.post('/:id', authMiddleware, adminMiddleware, getDriverById);
driverRouter.patch('/:id', authMiddleware, adminMiddleware, updateDriver);
driverRouter.patch('/profile/:id', authMiddleware, driverMiddleware, updateDriverProfile);
driverRouter.delete('/:id', authMiddleware, adminMiddleware, deleteDriver);

module.exports = driverRouter;