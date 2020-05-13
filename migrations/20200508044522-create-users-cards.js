'use strict';
const moment = require('moment');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users_cards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            stripe_customer_id: {
                type: Sequelize.STRING
            },
            card_id: {
                type: Sequelize.STRING
            },
            number_part: {
                type: Sequelize.STRING
            },
            brand: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            holder_name: {
                type: Sequelize.STRING
            },
            expiry_date: {
                type: Sequelize.STRING,
                // get() {
                //     return moment(this.getDataValue('expiry_date')).format('DD/MM/YYYY h:mm:ss');
                // }
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users_cards');
    }
};
