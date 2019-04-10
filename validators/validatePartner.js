require('../constants/sequelize');

const rules = [
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('type').not().isEmpty().withMessage('Partner type is required'),
    body('email').not().isEmpty().withMessage('email_required_error').isEmail().withMessage('email_invalid_error'),
    body().custom(async (req) => {
        let lang = req.lang;
        let email = req.email;

        // Retrieving a user with request email
        let partner = await Partners.findOne({where: {email: email}, attributes: ['email']});

        // Checking if user wrote first name and last name
        if (req['first_name_' + lang] === '' || req['last_name_' + lang] === '') {
            throw new Error('full_name_required_error')
        } else if (partner != null) throw new Error('E-mail exists');

    }),


];

module.exports = {
    rules
};