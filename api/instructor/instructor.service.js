const connection = require('../config');

const tablename = 'users';

module.exports = {
    getAllInstructor: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE role = 1`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    postInstructor: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (username, email, password, role) VALUES (?, ?, ?, 1)`,
            [
                req.username,
                req.email,
                req.password
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
}