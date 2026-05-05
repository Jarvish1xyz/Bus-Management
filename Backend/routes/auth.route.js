const express = require('express');
const { adminLogin, driverLogin, studentLogin } = require('../controllers/auth.controller');
const authRouter = express.Router();

authRouter.post('/admin/login', adminLogin);
authRouter.post('/driver/login', driverLogin);
authRouter.post('/student/login', studentLogin);

module.exports = authRouter;