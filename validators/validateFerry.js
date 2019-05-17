require('../constants/sequelize');

const rules = [
    body('name').not().isEmpty().withMessage('Name is required')
        .custom(async (name, {req}) => {
            // Retrieving a ferry with request name
            let partner = await Ferries.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Ferry name exists'),
    body('max_people').not().isEmpty().withMessage('Max people is required')
        .custom((max, {req}) => max > req.body.min_people).withMessage('Max people must be greater than Min people count'),
    body('min_people').not().isEmpty().withMessage('Min people is required'),
    body('lat').not().isEmpty().withMessage('Latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Latitude is invalid'),
    body('lng').not().isEmpty().withMessage('Longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Longitude is invalid'),
    // body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('address').not().isEmpty().withMessage('Address is required'),
    body('partner_id').custom((partner_id, {req}) => {
        if (req.decoded.role.name_en.toLocaleLowerCase() === 'admin' && !req.body.partner_id) {
           throw new Error('Partner is required');
        }
        return true;
    }),
];

module.exports = {
    rules
};
