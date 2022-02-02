const {
    createAdmin,
    getAllAdmin,
    getAdminbyEmail,
    getAdminbyUsername,
    getAdmin
} = require('./admin.service');
const { deleteUser, getUser } = require('../user/user.service');
const { deleteCourse, getCourse } = require('../instructor/course.service');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { ERROR, SUCCESS } = require('../respon');
const { sign } = require('jsonwebtoken');

const salt = genSaltSync(10);

module.exports = {
    register: (req, res) => {
        req.body.password = hashSync(req.body.password, salt);
        getAdminbyUsername(req.body.username, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length != 0) return ERROR(res, 409, "username already used");
            
            getAdminbyEmail(req.body.email, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length != 0) return ERROR(res, 409, "account already exist");

                createAdmin(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);

                    getAdmin(results1.insertId, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);

                        delete results2[0].password;
                        const token = sign({admin: results2}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
                        return SUCCESS(res, 200, {token: token, username: results2[0].username});
                    });
                });        
            });
        });
    },
    login: (req, res) => {
        getAdminbyEmail(req.body.email, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "invalid email");

            const verify = compareSync(req.body.password, result[0].password);
            if(!verify) return ERROR(res, 500, "incorrect password");

            delete result[0].password;
            const token = sign({admin: result[0]}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
            return SUCCESS(res, 200, {token: token, username: result[0].username});
        });
    },
    deleteUser: (req, res) => {
        getUser(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 500, "user doesnt exist");
            if(result[0].role == 1) return ERROR(res, 409, "user is instructor");

            deleteUser(req.params.id, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length == 0) ERROR(res, 500, "error when delete user");

                return SUCCESS(res, 200, "successfully deleted");
            });
        });
    },
    deleteInstructor: (req, res) => {
        getUser(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 500, "user doesnt exist");
            if(result[0].role == 0) return ERROR(res, 409, "user is not instructor");

            deleteUser(req.params.id, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length == 0) ERROR(res, 500, "error when delete instructor");

                return SUCCESS(res, 200, "successfully deleted");
            });
        });
    },
    deleteCourse: (req, res) => {
        getCourse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 500, "course doesnt exist");

            deleteCourse(req.params.id, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                if(results.length == 0) return ERROR(res, 500, "error when delete course");

                return SUCCESS(res, 200, "successfully deleted");
            });
        });
    }    
}