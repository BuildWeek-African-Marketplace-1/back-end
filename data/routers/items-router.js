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

// add an item - POSTMAN TESTED
router.post('/', restricted, (req, res) => {
    Items.addItem(req.body)
        .then((item) => {
            res.status(201).json({item, message: "item added successfully"});
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

// edit an item - POSTMAN TESTED
router.put('/:id', restricted, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Items.getItemById(id)
        .then((edit) => {
            if(edit) {
                Items.editItem(id, changes)
                    .then(updatedItem => {
                        res.status(200).json({ data: updatedItem })
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(404).json({ message: 'Could not find item with given ID' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to Edit Item' })
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