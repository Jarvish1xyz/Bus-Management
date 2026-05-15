const express = require('express');
const { getAllStudent, getStudentById, addStudent, deleteStudent, updateStudent, updateStudentProfile } = require('../controllers/student.controller');
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/auth.middleware');
const studentRouter = express.Router();

studentRouter.post('/all', authMiddleware, adminMiddleware, getAllStudent);
studentRouter.get('/:id', authMiddleware, getStudentById);
studentRouter.post('/', authMiddleware, adminMiddleware, addStudent);
studentRouter.patch('/:id', authMiddleware, adminMiddleware, updateStudent);
studentRouter.patch('/profile/:id', authMiddleware, studentMiddleware, updateStudentProfile);
studentRouter.delete('/:id', authMiddleware, adminMiddleware, deleteStudent);

module.exports = studentRouter;