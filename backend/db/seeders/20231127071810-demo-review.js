'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 2,
        review: 'new review 1',
        stars: 4
      },
      {
        userId: 1,
        spotId: 4,
        review: 'test test test test',
        stars: 3
      },
      {
        userId: 2,
        spotId: 1,
        review: 'new review 2',
        stars: 5
      },
      {
        userId: 3,
        spotId: 2,
        review: 'new review 3',
        stars: 5
      },
      {
        userId: 3,
        spotId: 1,
        review: 'new review 4',
        stars: 4
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['new review 1', 'new review 2', 'new review 3', 'new review 4']}
    }, {})
  }
};
