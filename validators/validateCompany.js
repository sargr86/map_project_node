require('../constants/sequelize');

const rules = [
    body('name', 'Company name is required').not().isEmpty()
    // Retrieving a company with request name and checking company existence
        .custom(async (name, {req}) => {
            let partner = await Companies.findOne({
                where: {name: name}, attributes: ['name']
            });
            return !((partner != null && !req.body.id));
        }).withMessage('Company name exists'),
    body('type_id', 'Company type is required').not().isEmpty(),

];

module.exports = {
    rules
};
