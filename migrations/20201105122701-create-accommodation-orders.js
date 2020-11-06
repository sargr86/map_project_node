'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accommodation_orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            adults: {
                type: Sequelize.INTEGER
            },
            children: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            checkin_date: {
                type: Sequelize.DATE
            },
            checkout_date: {
                type: Sequelize.DATE
            },
            client_full_name: {
                type: Sequelize.STRING
            },
            client_email: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            location: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            rooms: {
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accommodation_orders');
    }
};
