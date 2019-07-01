'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = await fse.readJSON(path.resolve(__dirname + '/data/food_drink_companies.json'));

        const type_id = await queryInterface.rawSelect('partner_types', {
            where: {
                name: 'Food/Drink'
            },
        }, ['id']);

        data['companies'].map(d => {
            d['type_id'] = type_id;
        });


        return queryInterface.bulkInsert('companies', data['companies'])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('companies', null, {});
    }
};
