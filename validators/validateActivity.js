require('../constants/sequelize');

const rules = [
    body('name')
        .not().isEmpty().withMessage('Name is required')
    // Retrieving an activity provider with request name and checking the provider existence
        .custom(async (name, {req}) => {
            let partner = await Activities.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Activity provider name exists'),
    // body('description', 'Description is required').not().isEmpty(),
    body('lat').not().isEmpty().withMessage('Latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Latitude is invalid'),
    body('lng').not().isEmpty().withMessage('Longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Longitude is invalid'),
    body('address', 'Address is required').not().isEmpty(),
    body('activity_type_id', 'Activity type is required').not().isEmpty(),
    body('partner_id', 'Partner is required').not().isEmpty()

];

module.exports = {
    rules
};
