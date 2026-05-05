const express = require('express');
const { getAllDriver, getDriverById, addDriver, deleteDriver } = require('../controllers/driver.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const driverRouter = express.Router();

driverRouter.post('/all', authMiddleware, adminMiddleware, getAllDriver);
driverRouter.get('/:id', authMiddleware, getDriverById);
driverRouter.post('/', authMiddleware, adminMiddleware, addDriver);
driverRouter.delete('/:id', authMiddleware, adminMiddleware, deleteDriver);

module.exports = driverRouter;