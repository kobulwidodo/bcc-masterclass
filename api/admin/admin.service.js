const connection = require('../config');

const tablename = 'admin';

module.exports = {
    getAllAdmin: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getAdmin: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE id_admin = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    },
    createAdmin: (req, callback) => {
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
    getAdminbyEmail: (req, callback) => {
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
    getAdminbyUsername: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE username = ?`,
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