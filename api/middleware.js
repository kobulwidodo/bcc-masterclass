const { verify } = require('jsonwebtoken');
const { ERROR } = require('./respon');

module.exports = {
    userToken: (req, res, next) => {
        let token = req.get('authorization');
        if(!token) return ERROR(res, 500, "Access denied!");
        token = token.slice(7);

        verify(token, process.env.APP_KEY, {algorithms: "HS256"}, (error, decoded) => {
            if(error) return ERROR(res, 500, error);

            if(!decoded.user[0].id_user) return ERROR(res, 500, "Account is not user");
            req.decoded = decoded;
            next();
        })
    },
    instructorToken: (req, res, next) => {
        if(req.decoded.user[0].role != 1) return ERROR(res, 500, "Account is not instructor");
        next();
    }
}