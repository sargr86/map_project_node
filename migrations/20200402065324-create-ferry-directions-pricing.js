'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ferry_directions_pricing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_point: {
        type: Sequelize.STRING
      },
      stop_1: {
        type: Sequelize.STRING
      },
      stop_2: {
        type: Sequelize.STRING
      },
      end_point: {
        type: Sequelize.STRING
      },
      min_people: {
        type: Sequelize.INTEGER
      },
      single: {
        type: Sequelize.INTEGER
      },
      return: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ferry_directions_pricings');
  }
};
