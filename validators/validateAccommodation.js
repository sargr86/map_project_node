require('../constants/sequelize');

const rules = [
    body('name', 'Name is required').not().isEmpty(),
    body('lat', 'Latitude is required').not().isEmpty(),
    body('lng', 'Longitude is required').not().isEmpty(),
    body().custom(async (req) => {

        if (!validatePattern(req.lat, 'lat')) {
            throw new Error('Latitude is invalid')
        } else if (!validatePattern(req.lng, 'lng')) {
            throw new Error('Longitude is invalid')
        }


        // Retrieving a user with request email
        let tourName = await Accommodations.findOne({where: {name: req.name}});

        if (tourName != null && !req.id) throw new Error('Name exists');

        else return true;
    }),
    body('address', 'Address is required').not().isEmpty(),
    body('partner_id', 'Partner is required').not().isEmpty()


];

module.exports = {
    rules
};