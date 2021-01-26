const jwt = require('jsonwebtoken');
const Username = require('../db').import('../models/username');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);
    if(!token){
        return res.status(403).send({auth: false, message: 'No Token'})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken);
            if(!err && decodeToken) {
                Username.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(username => {
                    console.log('username -->', username);
                    if(!username) throw err;
                    console.log('req -->', req);
                    req.username = username;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;