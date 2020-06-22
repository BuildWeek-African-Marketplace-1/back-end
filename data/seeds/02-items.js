
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          id: 1,
          name: 'Pullup Bar',
          description: 'This badboy will not fall off the trim if you use it. I have used this for over 20 years. Also if you read this until the end, let me know and I will give you this item for free.',
          price: 25.00,
          location: 'Cairo, Egypt',
          user_id: 1
        },
        {
          id: 2,
          name: 'Size 10 Running Shoes',
          description: 'These are brand new shoes I never wore. Please buy',
          price: 40.00,
          location: 'Lagos, Nigeria',
          user_id: 2
        },
        {
          id: 3,
          name: 'Large Bed Frame',
          description: 'Made for King Size Bed',
          price: 30.00,
          location: 'Lagos, Nigeria',
          user_id: 2
        },
        {
          id: 4,
          name: 'Tennis Racquet',
          description: 'Barely used so please use it after you buy it',
          price: 12.00,
          location: 'Lagos, Nigeria',
          user_id: 1
        },
        {
          id: 5,
          name: 'x5 Desk Lamps',
          description: 'Light up your room',
          price: 60.00,
          location: 'Cairo, Egypt',
          user_id: 1
        },
        {
          id: 6,
          name: 'Garden Tool Set',
          description: 'Not selling individual pieces. Non negotiable price',
          price: 40.00,
          location: 'Nairobi, Kenya',
          user_id: 1
        },
      ]);
    });
};
