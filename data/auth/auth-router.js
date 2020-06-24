const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../models/users-model');
const { isValid } = require('./auth-model');
const constants = require('../config/constants');
// add user - POSTMAN TESTED
router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash password
        const hash = bcryptjs.hashSync(credentials.password, rounds)

        credentials.password = hash;

        // save user to database
        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } else {
        res.status(400).json({
            message: "Please provide username & password"
        });
    }
});

// log user in - POSTMAN TESTED
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ email: email })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);
                    res.status(200).json({ message: 'You are now logged in', token });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } else {
        res.status(400).json({
            message: 'Please provide username & password'
        });
    }
});

function createToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    }

    const secret = constants.jwtSecret;

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;