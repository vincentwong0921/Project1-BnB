'use strict';

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created............................asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda',
        price: 123
      },
      {
        ownerId: 1,
        address: '238 This Lane',
        city: 'Los Angelees',
        state: 'California',
        country: 'United States of America',
        lat: 45.55522,
        lng: -152.4730327,
        name: 'App',
        description: 'Demo desc',
        price: 258
      },
      {
        ownerId: 3,
        address: '33548 11th street',
        city: 'Fremont',
        state: 'California',
        country: 'United States of America',
        lat: 28.94545,
        lng: -25.2222,
        name: 'Academy',
        description: 'Okay',
        price: 369
      },
      {
        ownerId: 1,
        address: '556 skylane drive',
        city: 'Union City',
        state: 'California',
        country: 'United States of America',
        lat: 18.94545,
        lng: -26.2242,
        name: 'Not Sure',
        description: 'Yeah',
        price: 586
      },
      {
        ownerId: 2,
        address: '3899 newport drive',
        city: 'Newark',
        state: 'California',
        country: 'United States of America',
        lat: 25.94545,
        lng: -23.2242,
        name: 'New Name',
        description: 'Nice Place',
        price: 448
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', 'App', 'Academy', 'Yeah', 'Nice Place']}
    }, {})
  }
};
