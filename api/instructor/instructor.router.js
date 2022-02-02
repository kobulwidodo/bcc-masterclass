const express = require('express');
const router = express.Router();

const {
    getAllInstructor,
    postCourse,
    register,
    updateCourse,
    deleteCourse,
    getInstructorCourse,
    getCourse
} = require('./instructor.controller');
const { userToken, instructorToken } = require('../middleware');

router.get('/', getAllInstructor);
router.post('/register', register);
router.post('/course', userToken, instructorToken, postCourse);
router.get('/course/:id', getCourse);
router.get('/course/all/:id', getInstructorCourse);
router.put('/course/:id', userToken, instructorToken, updateCourse);
router.delete('/course/:id', userToken, instructorToken, deleteCourse);

module.exports = router;