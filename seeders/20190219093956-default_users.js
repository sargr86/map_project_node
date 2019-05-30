'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    up: async (queryInterface) => {

        // Getting 'active' status id
        const status_id = await queryInterface.rawSelect('users_statuses', {
            where: {
                name_en: 'active'
            },
        }, ['id']);

        const role_id = await queryInterface.rawSelect('roles', {
            where: {
                name_en: 'Admin'
            },
        }, ['id']);

        const company_id = await queryInterface.rawSelect('companies', {
            where: {
                name: 'Secret South'
            },
        }, ['id']);

        return queryInterface.bulkInsert('users', [
            {
                first_name: 'John',
                last_name: 'Doe',
                birthday: '1986-03-30',
                gender: 'male',
                email: 'admin@gmail.com',
                password: bcrypt.hashSync('12345678', 10),
                profile_img: '',
                role_id: role_id,
                company_id: company_id,
                status_id: status_id,
                created_at: new Date(),
                updated_at: new Date()
            },

        ])
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
