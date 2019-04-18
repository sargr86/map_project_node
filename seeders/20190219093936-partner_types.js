'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('partner_types', [
            {
                name: 'Ferry'
            },
            {
                name: 'Food/Drink'
            },
            {
                name: 'Tours'
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('partner_types', null, {});
    }
};
