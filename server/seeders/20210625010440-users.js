'use strict';
const path = require('path');
const fs = require('fs');
const sequelize = require('sequelize');

const file = fs.readFileSync(path.resolve('seeders/usersDump.json'));
const users = JSON.parse(file).map((user) => ({
  ...user,
  roles: sequelize.literal(`ARRAY['admin']::"enum_Users_roles"[]`),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FaculUsersties', null, {});
  }
};
