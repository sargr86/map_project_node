require('../constants/sequelize');

const rules = [
    body('name').not().isEmpty().withMessage('Accommodation name is required').custom(async (name,{req}) => {
        // Retrieving an accommodation with request name
        let tourName = await Accommodations.findOne({where: {name: name}});
        return !(tourName != null && !req.body.id);

    }).withMessage('Accommodation name exists'),
    body('lat').not().isEmpty().withMessage('Latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Latitude is invalid'),
    body('lng').not().isEmpty().withMessage('Longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Longitude is invalid'),
    body('address', 'Address is required').not().isEmpty(),
    body('company_id', 'Company is required').not().isEmpty()


];

module.exports = {
    rules
};
