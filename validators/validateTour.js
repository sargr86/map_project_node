require('../constants/sequelize');

const rules = [
    body('name', 'Tour name is required').not().isEmpty(),
    body('lat', 'Tour latitude is required').not().isEmpty(),
    body('lng', 'Tour longitude is required').not().isEmpty(),
    body().custom(async (req) => {

        if(!validatePattern(req.lat,'lat')){
            throw new Error('Tour latitude is invalid')
        }

        else if(!validatePattern(req.lng,'lng')){
            throw new Error('Tour longitude is invalid')
        }



        // Retrieving a user with request email
        let tourName = await Tours.findOne({where: {name: req.name}});

        if (tourName != null && !req.id) throw new Error('Tour name exists');

        else return true;
    }),
    body('address', 'Tour address is required').not().isEmpty(),
    body('tours_type_id','Tour type is required').not().isEmpty(),
    body('partner_id','Tour partner is required').not().isEmpty()


];

module.exports = {
    rules
};