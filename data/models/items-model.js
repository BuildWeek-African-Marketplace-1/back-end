const db = require('../dbConfig');

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    deleteItem,
    editItem
}

function getAllItems() {
    return db('items')
}

function getItemById(id) {
    return db('items').where({ id }).first()
}

function addItem(item) {
    return db('items').insert(item, 'id')
}

function deleteItem(id) {
    return db('items')
        .where({ id })
        .del()
}

function editItem(id, changes) {
    return db('items')
        .where({ id })
        .update(changes)
}