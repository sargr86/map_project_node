'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      tours_type_id: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type:Sequelize.DATEONLY
      },
      end_date: {
        type:Sequelize.DATEONLY
      },
      start_time: {
        type: Sequelize.STRING
      },
      end_time:{
        type: Sequelize.STRING
      },
      participants_max_count: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      partner_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tours');
  }
};
