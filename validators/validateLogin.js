require('../constants/sequelize');

const rules = [
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body('password', 'Password is required').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;
        let pass = req.password;


        // Checking email existence & passwords match
        let found = await Users.findOne({attributes: ['email', 'password'], where: {email: email}});
        // if (!found) {
        //     console.log('A user with such email doesn\'t exist')
        //     throw new Error('A user with such email doesn\'t exist');
        // }

        // This case is for the users that signed up via social medias, and (accidentally) want to login regularly
        if (!found || !found.password) throw new Error('Invalid password or email');

        // Checking passwords match
        let match = await bcrypt.compare(pass, found.password);
        if (!match) throw new Error('Wrong password')
    })
];

module.exports = {
    rules
};
