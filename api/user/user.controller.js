const { 
    getAllUser,
    postUser,
    getUser,
    updateUser,
    getUserbyEmail,
    getUserbyUsername
} = require('./user.service');
const {
    getAllCourse
} = require('../instructor/course.service');
const {
    buyCourse,
    userCourse
} = require('./usercourse.service')
const { ERROR, SUCCESS } = require('../respon');
const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const salt = genSaltSync(10);

module.exports = {
    register: (req, res) => {
        req.body.password = hashSync(req.body.password, salt);
        getUserbyUsername(req.body.username, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length != 0) return ERROR(res, 409, "username already used");

            getUserbyEmail(req.body.email, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length != 0) return ERROR(res, 409, "account already exist");
    
                postUser(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);
        
                    getUser(results1.insertId, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);
                        
                        delete results2[0].password;
                        const token = sign({user: results2}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"})
                        return SUCCESS(res, 200, {token: token, username: results2[0].username});
                    });
                });
            });
        });
    },
    login: (req, res) => {
        getUserbyEmail(req.body.email, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "invalid email");

            const verify = compareSync(req.body.password, result[0].password);
            if(!verify) return ERROR(res, 500, "incorrect password");
            
            delete result[0].password;
            const token = sign({user: result}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"})
            return SUCCESS(res, 200, {token: token, username: result[0].username});
        });
    },
    getAllUser: (req, res) => {
        getAllUser((error, result) => {
            if(error) return ERROR(res, 500, error);

            for(let i = 0 ; i < result.length; i++){
                delete result[i].password
            }
            return SUCCESS(res, 200, result);
        });
    },
    getUser: (req, res) => {
        if(req.params.id != req.decoded.user[0].id_user) return ERROR(res, 409, "id user doesnt match");
        getUser(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            delete result[0].password;
            return SUCCESS(res, 200, result)
        });
    },
    updateUser: (req, res) => {
        if(req.params.id != req.decoded.user[0].id_user) return ERROR(res, 409, "id user doesnt match");
        req.body.id_user = req.params.id;
        updateUser(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, "successfully edited");
        });
    },
    getAllCourse: (req, res) => {
        getAllCourse((error, result) => {
            if(error) return ERROR(res, 500, error);

            for(let i = 0 ; i < result.length; i++){
                delete result[i].password;
                delete result[i].id_user;
            }
            return SUCCESS(res, 200, result);
        });
    },
    buyCourse: (req, res) => {
        req.body.id_user = req.decoded.user[0].id_user;
        req.body.id_course = req.params.id;
        buyCourse(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            if(result.length == 0) return ERROR(res, 500, "Something error when buy course");
            return SUCCESS(res, 200, "successfully purchased the course");
        });
    },
    userCourse: (req, res) => {
        if(req.params.id != req.decoded.user[0].id_user) return ERROR(res, 409, "id user doesnt match");

        userCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            for(let i = 0 ; i < result.length; i++) {
                delete result[i].password;
                delete result[i].id_course;
                delete result[i].id_user;
            }
            return SUCCESS(res, 200, result);
        })
    }
}