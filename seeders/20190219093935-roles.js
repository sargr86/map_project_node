'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name_en: "Admin",
            },
            {
                name_en: "Partner",

            }
        ])

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};