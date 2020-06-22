// if you're hashing your passwords and using seed data for users
// you will need to pre hash the passwords in the seed file 
// or it will be stored in plain text in the DB and you will not be able to log in
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          id: 1, 
          first_name: 'Toricruz', 
          last_name: 'Mendiola',
          email: 'tori@tori.com',
          password: '$2y$08$J9MjZr5utpEy1udhgRtJHO1JqQ7aDgF.BW7ec9Zb.YH7t5gM50vJS',
          owner_account: 1 
        },
        { 
          id: 2, 
          first_name: 'Joe', 
          last_name: 'Doe',
          email: 'joe@joe.com',
          password: '$2y$08$scpuJVSIEuRKU7N6UbjtrODIyZaGhLYKqs774amYspb8wKedQc9oC',
          owner_account: 1 
        },
        { 
          id: 3, 
          first_name: 'Zane', 
          last_name: 'Doe',
          email: 'zane@zane.com',
          password: '$2y$08$PNi6kzK6gYBfqfz4wusM2.Sqj1asY1O42SIrfGmQSZctfgCZqTGIu',
          owner_account: 0 
        }
      ]);
    });
};
