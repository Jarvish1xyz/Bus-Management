const express = require('express');
const { getAllStudent, getStudentById, addStudent, deleteStudent } = require('../controllers/student.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const studentRouter = express.Router();

studentRouter.post('/all', authMiddleware, adminMiddleware, getAllStudent);
studentRouter.get('/:id', authMiddleware, getStudentById);
studentRouter.post('/', authMiddleware, adminMiddleware, addStudent);
studentRouter.delete('/:id', authMiddleware, adminMiddleware, deleteStudent);

module.exports = studentRouter;