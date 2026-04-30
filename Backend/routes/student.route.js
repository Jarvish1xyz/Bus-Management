const express = require('express');
const { getAllStudent, getStudentById, addStudent } = require('../controllers/student.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const studentRouter = express.Router();

studentRouter.get('/all', authMiddleware, adminMiddleware, getAllStudent);
studentRouter.get('/:id', authMiddleware, getStudentById);
studentRouter.post('/', authMiddleware, adminMiddleware, addStudent);

module.exports = studentRouter;