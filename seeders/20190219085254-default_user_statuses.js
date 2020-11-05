'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users_statuses', [
            {
                'name_en': 'active',
            },
            {
                'name_en': 'inactive',
            }
        ])
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users_statuses', null, {});
    }
};
