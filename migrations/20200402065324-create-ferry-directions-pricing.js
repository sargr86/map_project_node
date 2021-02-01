'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ferry_directions_pricings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
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
                type: Sequelize.INTEGER,
                defaultValue: 6
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
                defaultValue: Sequelize.fn('NOW'),
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                defaultValue: Sequelize.fn('NOW'),
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ferry_directions_pricings');
    }
};
