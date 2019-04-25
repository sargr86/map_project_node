require('../constants/sequelize');

const rules = [
    body('name').not().isEmpty().withMessage('Name is required'),
    // body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('Email is invalid'),
    body('max_people').not().isEmpty().withMessage('Max people is required'),
    body('min_people').not().isEmpty().withMessage('Min people is required'),
    body('lat').not().isEmpty().withMessage('Latitude is required'),
    body('lng').not().isEmpty().withMessage('Longitude is required'),
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('address').not().isEmpty().withMessage('Address is required'),
    // body('type').not().isEmpty().withMessage('Partner type is required'),
    body('partner_id').not().isEmpty().withMessage('Partner is required'),
    body().custom(async (req) => {
        let email = req.email;

        if (req.min_people >= req.max_people) {
            throw new Error('Max people must be greater than Min people count');
        }

        // Retrieving a ferry with request email
        let partner = await Ferries.findOne({where: {email: email}, attributes: ['email']});

        // Checking if ferry email exists
        if (partner != null && !req.id) throw new Error('E-mail exists');

    }),


];

module.exports = {
    rules
};