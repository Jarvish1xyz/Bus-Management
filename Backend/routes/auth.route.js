const express = require('express');
const { adminLogin, driverLogin, studentLogin } = require('../controllers/auth.controller');
const authRouter = express.Router();

authRouter.post('/admin', adminLogin);
authRouter.post('/driver', driverLogin);
authRouter.post('/student', studentLogin);

module.exports = authRouter;