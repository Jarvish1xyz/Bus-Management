const express = require('express');
const { getAllAdmin, addAdmin, getAdminById } = require('../controllers/admin.controller');
const adminRouter = express.Router();

adminRouter.get('/all', getAllAdmin);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/', addAdmin);

module.exports = adminRouter;