'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('computers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warranty_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      patrimony_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id_register: {
        type: Sequelize.BIGINT,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('computers');
  }
};