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
        url: 'https://images.unsplash.com/photo-1471958680802-1345a694ba6d?q=80&w=1566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1569614738755-51099edf0ce5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1593585894599-0f0deb07e3cd?q=80&w=2242&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1515179330434-54edd3706df1?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1558980395-2f289089d3ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1444454508600-22e585108a04?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1426001094903-70f302dc2d24?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1519143587129-d7ae992bc44c?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1624971298067-4e6fca00fd6a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot'
      },
      {
        url: 'new urllllllll',
        preview: true,
        imageableId: 3,
        imageableType: 'Review'
      },
      {
        url: 'https://images.unsplash.com/photo-1526763025764-2a8073a0cd43?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1624964562918-0b8cf87deee6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'Hello.url',
        preview: true,
        imageableId: 5,
        imageableType: 'Review'
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableId: { [Op.in]: [1, 2, 3, 5] }
    }, {})
  }
};
