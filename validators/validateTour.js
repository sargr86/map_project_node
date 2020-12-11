require('../constants/sequelize');

const rules = [
    body('tours_type_id', 'Tour type is required').not().isEmpty(),

    // body('lat').not().isEmpty().withMessage('Tour latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour latitude is invalid'),
    // body('lng').not().isEmpty().withMessage('Tour longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour longitude is invalid'),
    // body('address', 'Tour address is required').not().isEmpty(),
    body('locations').custom((item) => {
        let locations = JSON.parse(item);
        let emptyLocations = locations.find(l => !l.id);
        if (emptyLocations) {
            console.log(emptyLocations)
            throw new Error('Please select 2-4 locations')
        }
        return true;
    }),
    body('start_date', 'Start date is required').not().isEmpty(),
    body('end_date', 'End date is required').not().isEmpty(),
    body('start_time', 'Start time is required').not().isEmpty(),
    body('end_time', 'End date is required').not().isEmpty(),
    body('price', 'Price is required').not().isEmpty(),
    body('name', 'Tour name is required').not().isEmpty()
    // Retrieving a tour with request name and checking tour existence
        .custom(async (name, {req}) => {
            let partner = await Tours.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Tour name exists'),
    body('company_id', 'Tour partner company name is required').not().isEmpty(),
    // body('img').custom((img, {req}) => req.body.id || img).withMessage('Tour image is required'),

];

module.exports = {
    rules
};
