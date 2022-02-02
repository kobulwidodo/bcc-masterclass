const { verify } = require('jsonwebtoken');
const { ERROR } = require('./respon');

module.exports = {
    tokenValidation: (req, res, next) => {
        let token = req.get('authorization');
        if(!token) return ERROR(res, 500, "Access denied!");
        token = token.slice(7);

        req.token = token;
        next();
    },
    userToken: (req, res, next) => {
        verify(req.token, process.env.APP_KEY, {algorithms: "HS256"}, (error, decoded) => {
            if(error) return ERROR(res, 500, error);
            
            if(!decoded.user[0].id_user) return ERROR(res, 500, "Account is not user");
            req.decoded = decoded;
            next();
        })
    },
    instructorToken: (req, res, next) => {
        if(req.decoded.user[0].role != 1) return ERROR(res, 500, "Account is not instructor");
        next();
    },
    adminToken: (req, res, next) => {
        verify(req.token, process.env.APP_KEY, {algorithms: "HS256"}, (error, decoded) => {
            if(error) return ERROR(res, 500, error);

            if(!decoded.admin.id_admin) return ERROR(res, 500, "Account is not admin");
            req.decoded = decoded;
            next();
        });
    }
}