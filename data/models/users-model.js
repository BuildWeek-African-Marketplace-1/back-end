const db = require('../dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    editUser,
    removeUser
}

function find() {
    return db('users').select('*').orderBy('id')
}

function findBy(filter) {
    return db('users as u')
    .select('u.id', 'u.email', 'u.password', 'u.owner_account')
    .where(filter).orderBy('u.id')
}

async function add(user) {
    try {
        const [id] = await db('users').insert(user, 'id');
        return findById(id)
    } catch (error) {
        throw error;
    } 
}

function findById(id) {
    return db('users').where({ id }).first();
}

function editUser(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
}

function removeUser(id) {
    return db('users')
        .where({ id })
        .del()
}