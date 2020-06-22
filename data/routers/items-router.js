const router = require('express').Router();

const Items = require('../models/items-model');
const restricted = require('../auth/restricted-middleware');

// get all items - POSTMAN TESTED
router.get('/', restricted, (req, res) => {
    Items.getAllItems()
        .then(item => {
            res.status(200).json({ data: item})
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

// add an item
router.post('/', restricted, (req, res) => {
    Items.addItem(req.body)
        .then((item) => {
            res.status(201).json({item, message: "item added successfully"});
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

// delete an item - POSTMAN TESTED
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Items.deleteItem(id)
        .then((item) => {
            res.status(200).json({ message: "Your item has been successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

// function checkRole() {
//     return (req, res, next) => {
//         if (req.body.user_id == 1) {
//             next();
//         } else {
//             res.status(403).json({ message: "Your account is not permitted to add items" })
//         }
//     }
// }

module.exports = router;