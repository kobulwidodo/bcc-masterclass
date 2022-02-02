const connection = require('../config');

const tablename = 'course';

module.exports = {
    createCourse: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (name, id_user, price) VALUES (?, ?, ?)`,
            [
                req.name,
                req.id_user,
                req.price
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    updateCourse: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET name = ?, price = ?, update_course_time = NOW() 
            WHERE id_course = ?`,
            [
                req.name,
                req.price,
                req.id_course
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    deleteCourse: (req, callback) => {
        connection.query(
            `DELETE FROM ${tablename} WHERE id_course = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    },
    getCourse: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} C JOIN users U ON C.id_user = U.id_user WHERE id_course = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getInstructorCourse: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} C JOIN users U ON C.id_user = U.id_user WHERE C.id_user = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getAllCourse: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename} C JOIN users U ON C.id_user = U.id_user`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}