// if you're hashing your passwords and using seed data for users
// you will need to pre hash the passwords in the seed file 
// or it will be stored in plain text in the DB and you will not be able to log in
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
