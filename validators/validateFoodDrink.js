require('../constants/sequelize');

const rules = [
    body('name', 'Name is required').not().isEmpty()
    // Retrieving a tour with request name and checking tour existence
        .custom(async (name, {req}) => {
            let partner = await FoodDrink.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Food/drink name exists'),
    body('description', 'Description is required').not().isEmpty(),
    body('lat').not().isEmpty().withMessage('Latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Latitude is invalid'),
    body('lng').not().isEmpty().withMessage('Longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Longitude is invalid'),
    body('address', 'Address is required').not().isEmpty(),
    body('partner_id', 'Partner is required').not().isEmpty()

];

module.exports = {
    rules
};