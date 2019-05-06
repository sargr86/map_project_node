require('../constants/sequelize')

const rules = [
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    // body('gender', 'gender_required_error').not().isEmpty(),
    body().custom(async (req) => {
        let lang = req.lang;
        let email = req.email;

        // Retrieving a user with request email
        let user = await Users.findOne({where: {email: email}});

        // Checking if user wrote first name and last name
        if (req['first_name'] === '' || req['last_name'] === '') {
            throw new Error('Full name is required')
        }

        else return true;
    }),


];

module.exports = {
    rules
};