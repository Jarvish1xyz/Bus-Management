const express = require('express');
const { getAllAdmin, addAdmin, getAdminById, count } = require('../controllers/admin.controller');
const adminRouter = express.Router();

adminRouter.get('/all', getAllAdmin);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/', addAdmin);
adminRouter.post('/count', count);

module.exports = adminRouter;