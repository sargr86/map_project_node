'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name_en: 'Admin',
            },
            {
                name_en: 'Partner',
            },
            {
                name_en: 'Employee'
            },
            {
                name_en: 'Customer'
            },
            {
                name_en: "Driver"
            }
        ])

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
