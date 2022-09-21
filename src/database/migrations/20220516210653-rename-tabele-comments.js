'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('commentes', 'comments');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('commentes', 'comments');
  }
};
