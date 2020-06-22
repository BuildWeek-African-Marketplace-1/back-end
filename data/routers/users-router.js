const router = require('express').Router();

const Users = require('../models/users-model');
const restricted = require('../auth/restricted-middleware');

// get a list of users
router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users, decodedToken: req.decodedToken })
        })
        .catch(err => res.send(err))
});

// LOGIN / REGISTER Endpoints are in auth router

module.exports = router;