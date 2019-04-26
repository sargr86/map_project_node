require('../constants/sequelize');

const rules = [
    body('name', 'Tour name is required').not().isEmpty()
        // Retrieving a tour with request name and checking tour existence
        .custom(async (name, {req}) => {
            let partner = await Tours.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Tour name exists'),
    body('lat').not().isEmpty().withMessage('Tour latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour latitude is invalid'),
    body('lng').not().isEmpty().withMessage('Tour longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour longitude is invalid'),
    body('address', 'Tour address is required').not().isEmpty(),
    body('tours_type_id', 'Tour type is required').not().isEmpty(),
    body('partner_id', 'Tour partner is required').not().isEmpty(),
    body('img').custom((img, {req}) => req.body.id || img).withMessage('Tour image is required'),

];

module.exports = {
    rules
};