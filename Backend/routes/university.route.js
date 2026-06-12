const express = require('express');
const { getAllUniversity, getUniversityById, addUniversity, updateUniversity } = require('../controllers/university.controller');
const {authMiddleware, adminMiddleware} = require('../middleware/auth.middleware');
const universityRouter = express.Router();

universityRouter.get('/all', getAllUniversity);
universityRouter.get('/:id', getUniversityById);
// console.log("Request is in route")
universityRouter.post('/', addUniversity);
universityRouter.patch('/:id', authMiddleware, adminMiddleware, updateUniversity)

module.exports = universityRouter;