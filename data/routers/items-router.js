const router = require('express').Router();

const Items = require('../models/items-model');
const restricted = require('../auth/restricted-middleware');

// get all items
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
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

module.exports = router;