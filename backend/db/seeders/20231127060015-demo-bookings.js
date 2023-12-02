'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-11-27",
        endDate: "2023-11-28"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-11-28",
        endDate: "2023-11-29"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-11-27",
        endDate: "2023-11-28"
      },

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [ 1, 2]}
    }, {})
  }
};
