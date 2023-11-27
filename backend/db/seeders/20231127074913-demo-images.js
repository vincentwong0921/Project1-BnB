'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        url: 'url1',
        preview: true,
        imageableId: 1,
        imageableType: 'Review'
      },
      {
        url: 'url2',
        preview: true,
        imageableId: 2,
        imageableType: 'Review'
      },
      {
        url: 'url3',
        preview: true,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'url4',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'url5',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableId: { [Op.in]: [1, 2] }
    }, {})
  }
};
