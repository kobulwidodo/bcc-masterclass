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
const { tokenValidation, userToken, instructorToken } = require('../middleware');

router.post('/register', register);
router.post('/course', tokenValidation, userToken, instructorToken, postCourse);
router.get('/course/:id', tokenValidation, userToken, getCourse);
router.get('/course/all/:id', getInstructorCourse);
router.put('/course/:id', tokenValidation, userToken, instructorToken, updateCourse);
router.delete('/course/:id', tokenValidation, userToken, instructorToken, deleteCourse);

module.exports = router;