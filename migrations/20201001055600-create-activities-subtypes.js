'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('activity_subtypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      double_price: {
        type: Sequelize.INTEGER
      },
      min_age: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('activity_subtypes');
  }
};