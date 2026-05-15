const express = require('express');
const { getAllAdmin, addAdmin, getAdminById, count, updateAdminProfile } = require('../controllers/admin.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const adminRouter = express.Router();

adminRouter.get('/all', getAllAdmin);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/', addAdmin);
adminRouter.post('/count', count);
adminRouter.patch('/profile/:id', authMiddleware, adminMiddleware, updateAdminProfile);

module.exports = adminRouter;