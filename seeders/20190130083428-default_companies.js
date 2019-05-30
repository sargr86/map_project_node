'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('companies', [
            {
                name: 'Secret South',
                created_at: new Date(),
                updated_at: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('companies', null, {});
    }
};
