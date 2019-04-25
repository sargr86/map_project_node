'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('partner_types', [
            {
                name: 'Ferries'
            },
            {
                name: 'Food/Drink'
            },
            {
                name: 'Tours'
            },
            {
                name: 'Activities'
            },
            {
                name: 'Accommodations'
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('partner_types', null, {});
    }
};
