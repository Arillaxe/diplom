'use strict';
const path = require('path');
const fs = require('fs');

const file = fs.readFileSync(path.resolve('seeders/roomsDump.json'));
const rooms = JSON.parse(file).map((room) => ({
  ...room,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', rooms);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
