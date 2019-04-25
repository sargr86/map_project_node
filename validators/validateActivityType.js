require('../constants/sequelize');

const rules = [
    body('name', 'Activity type name is required').not().isEmpty(),
    body().custom(async (req) => {

        // Retrieving a user with request email
        let activityType = await ActivityTypes.findOne({where: {name: req.name}});

        if (activityType != null && !req.id) throw new Error('Activity type exists');

        else return true;
    }),


];

module.exports = {
    rules
};