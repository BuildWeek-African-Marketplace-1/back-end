exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('first_name', 100).notNullable().index();
      tbl.string('last_name', 100).notNullable();
      tbl.string('email', 150).notNullable();
      tbl.string('password', 255).notNullable();
      tbl.boolean('owner_account')
    })
    .createTable('items', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable();
      tbl.string('description', 255).notNullable();
      tbl.float('price').notNullable();
      tbl.string('location', 255).notNullable();
      // foreign key
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
    })
};

exports.down = function(knex) {
  return knex.dropTableIfExists('users').dropTableIfExists('items')
};
