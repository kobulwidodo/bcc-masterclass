const {
    getAllInstructor,
    postInstructor
} = require('./instructor.service');
const {
    getUserbyEmail,
    getUserbyUsername,
    getUser
} = require('../user/user.service');
const {
    createCourse,
    deleteCourse,
    updateCourse,
    getCourse,
    getInstructorCourse
} = require('./course.service');
const { ERROR, SUCCESS } = require('../respon');
const { genSaltSync, hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const salt = genSaltSync(10);

module.exports = {
    getAllInstructor: (req, res) => {
        getAllInstructor((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            for(let i = 0; i < result.length ; i++) {
                delete result[i].password;
            }
            return SUCCESS(res, 200, result);
        })
    },
    register: (req, res) => {
        req.body.password = hashSync(req.body.password, salt);
        getUserbyUsername(req.body.username, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length != 0) return ERROR(res, 409, "username already used");

            getUserbyEmail(req.body.email, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length != 0) return ERROR(res, 409, "account already exist");

                postInstructor(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);

                    getUser(results1.insertId, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);

                        delete results2[0].password;
                        const token = sign({user: results2}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
                        return SUCCESS(res, 200, {token: token, username: results2[0].username});
                    });               
                });
            });
        });  
    },
    postCourse: (req, res) => {
        req.body.id_user = req.decoded.user[0].id_user;
        createCourse(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, {id_course: result.insertId});
        });
    },
    updateCourse: (req, res) => {
        getCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result[0].id_user != req.decoded.user[0].id_user) return ERROR(res, 409, "id instructor doesnt match");

            req.body.id_course = req.params.id;
            updateCourse(req.body, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);

                return SUCCESS(res, 200, "successfully edited");
            });
        });
    },
    deleteCourse: (req, res) => {
        getCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result[0].id_user != req.decoded.user[0].id_user) return ERROR(res, 409, "id instructor doesnt match");

            deleteCourse(req.params.id, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);

                return SUCCESS(res, 200, "successfully deleted");
            });
        });
    },
    getCourse: (req, res) => {
        getCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            delete result[0].password;
            delete result[0].id_user;
            return SUCCESS(res, 200, result);
        });
    },
    getInstructorCourse: (req, res) => {
        getInstructorCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            for(let i = 0 ; i < result.length; i++){
                delete result[i].password;
                delete result[i].id_user;
            }
            return SUCCESS(res, 200, result);
        })
    }
}