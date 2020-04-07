require('../constants/sequelize');

const rules = [
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    // body('password', '').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;
        let pass = req.password;

        // For mobile Google auth
        if (req.google_user_id) {
            let googleUserCheck = await Users.findOne({
                attributes: ['email', 'password'],
                where: {google_user_id: req.google_user_id}
            });

            if (!googleUserCheck) throw new Error('Invalid password or email');
            // Regular login
        }

        else if(req.fb_user_id) {
            let fbUserCheck = await Users.findOne({
                attributes: ['email', 'password'],
                where: {fb_user_id: req.fb_user_id}
            });

            if (!fbUserCheck) throw new Error('Invalid password or email');
        }

        else {

            if (!pass) {
                throw new Error('Password is required');
            }

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
        }


    })
];

module.exports = {
    rules
};
