const connection = require('../config');

const tablename = 'user_course';

module.exports = {
    buyCourse: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_course, id_user) VALUES (?, ?)`,
            [
                req.id_course,
                req.id_user
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    userCourse: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} C JOIN users U ON C.id_user = U.id_user
            JOIN course C1 ON C1.id_course = C.id_course WHERE U.id_user = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}