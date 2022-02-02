const connection = require('../config');

const tablename = 'users';

module.exports = {
    postUser: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (username, email, password) VALUES (?, ?, ?)`,
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
    getUser: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE id_user = ?`,
            [req],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getAllUser: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE role = 0`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    updateUser: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET username = ?, email = ?, update_users_time = NOW() 
            WHERE id_user = ?`,
            [
                req.username,
                req.email,
                req.id_user
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getUserbyEmail: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE email = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getUserbyUsername: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE username = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    }
}