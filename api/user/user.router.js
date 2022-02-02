const express = require('express');
const router = express.Router();

const { 
    getAllUser,
    register,
    updateUser,
    getUser,
    login,
    getAllCourse,
    buyCourse,
    userCourse,
    deleteUserCourse
} = require('./user.controller');
const { getAllInstructor } = require('../instructor/instructor.controller');
const { tokenValidation, userToken } = require('../middleware');

router.get('/course', tokenValidation, userToken, getAllCourse);
router.get('/instructor', tokenValidation, userToken, getAllInstructor);
router.get('/:id', tokenValidation, userToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/course/:id', tokenValidation, userToken, buyCourse);
router.get('/course/:id', tokenValidation, userToken, userCourse);
router.put('/update/:id', tokenValidation, userToken, updateUser);
router.delete('/course/:id', tokenValidation, userToken, deleteUserCourse);

module.exports = router;