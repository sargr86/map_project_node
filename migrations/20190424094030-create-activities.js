'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('activities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            partner_id: {
                type: Sequelize.INTEGER
            },
            company_id: {
                type: Sequelize.INTEGER
            },
            activity_type_id: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            lat: {
                type: Sequelize.STRING
            },
            lng: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.TEXT
            },
            img: {
                type: Sequelize.STRING
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('activities');
    }
};
