const router = require('express').Router();

const Users = require('../models/users-model');
const restricted = require('../auth/restricted-middleware');

// get a list of users - POSTMAN TESTED
router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users, decodedToken: req.decodedToken })
        })
        .catch(err => res.send(err))
});

// LOGIN / REGISTER Endpoints are in auth router

// edit user - POSTMAN TESTED
router.put('/:id', restricted, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Users.findById(id)
        .then((edit) => {
            if(edit) {
                Users.editUser(id, changes)
                    .then(updatedUser => {
                        res.status(200).json({ data: updatedUser })
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(404).json({ message: 'Could not find user with given ID' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to Edit User' })
        })
})

// remove user - POSTMAN TESTED
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Users.removeUser(id)
        .then((user) => {
            res.status(200).json({ message: "Your account has been successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

module.exports = router;