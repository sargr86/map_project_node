require('../constants/sequelize')

const rules = [
    body('name', 'Tour type name is required').not().isEmpty(),
    body().custom(async (req) => {

        // Retrieving a user with request email
        let tourType = await ToursType.findOne({where: {name: req.name}});

        if (tourType != null && !req.id) throw new Error('Tour type exists');

        else return true;
    }),


];

module.exports = {
    rules
};