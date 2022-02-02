const express = require('express');
const router = express.Router();

const {
    register,
    login,
    deleteUser,
    deleteInstructor,
    deleteCourse
} = require('./admin.controller');
const { getAllUser, getAllCourse } = require('../user/user.controller');
const { getAllInstructor } = require('../instructor/instructor.controller');

const { tokenValidation, adminToken } = require('../middleware');

router.get('/user', tokenValidation, adminToken, getAllUser);
router.get('/instructor', tokenValidation, adminToken, getAllInstructor);
router.get('/course', tokenValidation, adminToken, getAllCourse);
router.post('/register', tokenValidation, adminToken, register);
router.post('/login', login);
router.delete('/delete/user/:id', tokenValidation, adminToken, deleteUser);
router.delete('/delete/instructor/:id', tokenValidation, adminToken, deleteInstructor);
router.delete('/delete/course/:id', tokenValidation, adminToken, deleteCourse);

module.exports = router;