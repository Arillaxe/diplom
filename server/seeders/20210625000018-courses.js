'use strict';
const path = require('path');
const fs = require('fs');

const file = fs.readFileSync(path.resolve('seeders/coursesDump.json'));
const courses = JSON.parse(file).map((course) => ({
  title: course.Name,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', courses);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
