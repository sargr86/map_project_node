require('../constants/sequelize')

const rules = [
    body('name', 'Tour name is required').not().isEmpty(),
    body().custom(async (req) => {

        // Retrieving a user with request email
        let tourName = await Tours.findOne({where: {name: req.name}});

        if (tourName != null && !req.id) throw new Error('Tour name exists');

        else return true;
    }),


];

module.exports = {
    rules
};