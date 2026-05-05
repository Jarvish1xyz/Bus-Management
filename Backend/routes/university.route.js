const express = require('express');
const { getAllUniversity, getUniversityById, addUniversity } = require('../controllers/university.controller');
const universityRouter = express.Router();

universityRouter.get('/all', getAllUniversity);
universityRouter.get('/:id', getUniversityById);
console.log("Request is in route")
universityRouter.post('/', addUniversity);

module.exports = universityRouter;