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
    userCourse
} = require('./user.controller');
const { userToken } = require('../middleware');

router.get('/', getAllUser);
router.get('/course', getAllCourse);
router.get('/:id', userToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/course/:id', userToken, buyCourse);
router.get('/course/:id', userToken, userCourse);
router.put('/update/:id', userToken, updateUser);

module.exports = router;