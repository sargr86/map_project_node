require('../constants/sequelize')

const rules = [
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body('user_type','User type is required').not().isEmpty(),
    body('field_type','Field type is required').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;

        // Retrieving a user with request email
        let user = await Users.findOne({where: {email: email}});

        if (user != null) throw new Error('E-mail exists');

        // return true;
    }),


];

module.exports = {
    rules
};
