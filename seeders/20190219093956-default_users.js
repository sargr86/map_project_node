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

        const admin_role_id = await queryInterface.rawSelect('roles', {
            where: {
                name_en: 'Admin'
            },
        }, ['id']);

        const employee_role_id = await queryInterface.rawSelect('roles', {
            where: {
                name_en: 'Employee'
            },
        }, ['id']);


        const customer_role_id = await queryInterface.rawSelect('roles', {
            where: {
                name_en: 'Customer'
            },
        }, ['id']);

        const company_id = await queryInterface.rawSelect('companies', {
            where: {
                name: 'Secret South'
            },
        }, ['id']);

        const operator_pos_id = await queryInterface.rawSelect('positions', {
            where: {
                name: 'Operator'
            },
        }, ['id']);

        console.log("OPERATOR!!!!!!!!!!!" + operator_pos_id)

        const driver_pos_id = await queryInterface.rawSelect('positions', {
            where: {
                name: 'Driver'
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
                role_id: admin_role_id,
                company_id: company_id,
                status_id: status_id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                first_name: 'Test',
                last_name: 'Operator',
                birthday: new Date(),
                gender: 'female',
                email: 'operator@gmail.com',
                password: bcrypt.hashSync('12345678', 10),
                profile_img: '',
                role_id: operator_pos_id,
                company_id: company_id,
                status_id: status_id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                first_name: 'Test',
                last_name: 'Driver',
                birthday: new Date(),
                gender: 'male',
                email: 'driver@gmail.com',
                password: bcrypt.hashSync('12345678', 10),
                profile_img: '',
                role_id: employee_role_id,
                position_id: driver_pos_id,
                company_id: company_id,
                status_id: status_id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                first_name: 'Test',
                last_name: 'Customer',
                birthday: new Date(),
                gender: 'male',
                email: 'customer@gmail.com',
                password: bcrypt.hashSync('12345678', 10),
                profile_img: '',
                role_id: customer_role_id,
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
