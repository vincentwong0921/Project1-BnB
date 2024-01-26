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
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1591170715502-fbc32adc4f52?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
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
        url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1609757754057-8a8e17eb73b2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1584752242818-b4bd7fb3fe10?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true,
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1586982599726-11708daaceca?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot'
      },
      {
        url: 'Hello.url',
        preview: false,
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
