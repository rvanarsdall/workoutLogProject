const router = require('express').Router();
const Username = require('../db').import('../models/username');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*REGISTER A USERNAME */

router.post('/register', (req, res) => {
    Username.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 13)
    })
    .then( function usernameRegistered(username) {
        let token = jwt.sign({id: username.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.json({
            username: username,
            message: "Username successfully registered!",
            sessionToken: token
        });
    }
    )
    .catch(err => res.status(500).json({error: err}))
});

/* USERNAME LOGIN  */
router.post('/login', (req, res) => {
    Username.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(function loginSuccess(username) {
        if(username) {
            bcrypt.compare(req.body.username.passwordhash, username.passwordhash, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: username.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    res.status(200).json({
                        username: username,
                        message: "Username successfully logged in!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: "Username Login Failed"});
                }
            });
        } else {
            res.status(500).json({error: 'Username does not exist'})
        }
    })
    .catch(err => res.status(500).json({error: err}))
});


module.exports = router;