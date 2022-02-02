import User from '../models/User.js'
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next){
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if(err){
                res.locals.user = null;
                res.status(403).json({
                    error: 'Unauthorized, must be logged to do this operation'
                });
            } else{
                let user = await User.findById(payload.id);
                res.locals.user = user;
                next();
            }
        });
    } else{
        res.locals.user = null;
        res.status(403).json({
            error: 'Unauthorized, must be logged in to do this operation'
        });
    };
};

export function requireRole(role){
    return (req, res, next) => {
        if(res.locals.user.roles >= role){
            next();
        } else{
            res.status(403).json({
                error: 'Unauthorized, permission not enough'
            });
        };
    };
}
