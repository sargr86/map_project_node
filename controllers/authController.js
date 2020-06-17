require('../constants/sequelize');
const nodemailer = require('nodemailer');
const UsersCards = db.users_cards;

/**
 * Registers a user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.register = async (req, res) => {
    let data = req.body;

    uploadProfileImg(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }

            // Saving the original password of user and hashing it to save in db
            let originalPass = data.password;
            data.password = bcrypt.hashSync(originalPass, 10);


            // Getting active status id and appending it to user request data
            let status = await UsersStatuses.findOne({where: {name_en: 'active'}, attributes: ['id']});
            data.status_id = status.toJSON()['id'];

            // Getting current user type role id
            let role = await Roles.findOne({
                where: {name_en: {[Op.like]: `%${data.user_type}%`}}, attributes: ['id']
            });
            data.role_id = role.toJSON()['id'];

            // Getting current user type position id
            let position = await Positions.findOne({
                where: {name: {[Op.like]: `%${data.user_type}%`}}, attributes: ['id']
            });
            data.position_id = position.toJSON()['id'];

            if (data.user_type !== 'customer') {
                let partner_type = await PartnerTypes.findOne({
                    where: {id: data.field_type}
                });
                data.partner_type_id = partner_type.toJSON()['id'];
            }

            if (data.company_id === '') {

                data.company_id = null;
            }


            await Users.create(data);

            // Saving the original password again to request for authenticating the user at once
            data.password = originalPass;
            req.body = data;

            // res.json("OK");

            this.login(req, res);
        }


    })


};

/**
 * Authenticates the user
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {


    // Checking validation result from express-validator
    if (!showIfErrors(req, res)) {
        // Getting request data and setting user fields to return
        let data = req.body;
        let email = data.email.trim();

        // let userType = data.userType ? 'Partner' : 'Admin';


        let attributes = [`first_name`, `last_name`, fullName(`first_name`, `last_name`), 'email',
            fullName(`first_name`, `last_name`, '_', 'socket_nickname'), 'profile_img', 'password', 'id', 'status_id', 'phone', 'birthday', 'google_user_id'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

        // let userTypeWhere = sequelize.where(sequelize.col('`role.name_en`'), userType);


        // Selecting an employee that has an email matching request one
        let user = await Users.findOne({
            attributes: attributes,
            include: [
                {model: UsersStatuses, attributes: ['name_en'], where: {statusWhere}},
                {model: Roles, attributes: ['name_en', 'id']},// where: {userTypeWhere},
                {model: Companies, attributes: ['id', 'name']},
                {model: Positions, attributes: ['name']},
                {model: PartnerTypes}
            ],
            where: {email: email} //userTypeWhere
        }, res);


        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

            else {
                // Cloning users object without password and saving user full name
                user = user.toJSON();
                user['socket_nickname'] = user['socket_nickname'].replace(/ /g, '_');
                let {password, ...details} = user;
                let full_name = user[`first_name`] + ' ' + user[`last_name`];

                res.status(200).json({
                    token: jwt.sign(details, 'secretkey', {expiresIn: '8h'}), user_id: user.id, full_name: full_name
                })
            }


        }
    }


};


/**
 * Updates show-profile info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateProfile = async (req, res) => {

    let data = req.body;

    console.log('update profile!!!!!')

    uploadProfileImg(req, res, async (err) => {
        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {
            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }


            // Cloning user object without id and language to build update fields
            let {id, lang, ...fields} = data;

            // console.log(fields)

            delete fields.email; //temporary
            let result = await to(Users.update(fields, {where: {id: data.id}}), res);
            res.json(result)
        }
    })


};

/**
 * Gets profile data of current authenticated user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getProfile = async (req, res) => {

    const data = req.query;
    const email = data.email;
    const attributes = ['first_name', 'last_name', 'id', 'email', 'profile_img'
        // 'partner_type_id',  'role_id'
    ];

    // Selecting an employee that has an email matching request one
    let user = await Users.findOne({
        where: {email: email}, attributes: attributes, include: [
            {model: UsersCards}
        ]
    });
    res.json(user);
};

/**
 * Reset/change password
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.changePassword = async (req, res) => {
    let data = req.body;
    let newPassword = data.new_password;
    let oldPassword = data.old_password;
    let foundUser = await Users.findOne({where: {email: data.email}});


    if (!foundUser) {
        res.status(500).json('User is not found');
    } else {

        let match = await bcrypt.compare(oldPassword, foundUser.password);
        if (!match) {
            res.status(500).json('Wrong password')
        } else {
            data.password = bcrypt.hashSync(newPassword, 10);

            let result = await to(Users.update({password: data.password}, {where: {email: data.email}}), res);
            res.json('OK')
        }


    }

};


exports.forgotPassword = async (req, res) => {
// Getting validation result from express-validator
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json(errors.array()[0]);
//     }
    const user = req.body;
    let foundUser = await Users.findOne({where: {email: user.email}});


    if (!foundUser) {
        res.status(500).json('User is not found');
    } else {


        const email = user.email || 'sofiabruno3003@gmail.com'; //sofiabruno3003@gmail.com

        let tempToken = jwt.sign({
            email: user.email,
            id: user.id,

            first_name: user.first_name,
            last_name: user.last_name,
            company_id: user.company_id,
            gender: user.gender,
            field_type: user.field_type,
            user_type: user.user_type
        }, 'secretkey', {expiresIn: '1h'});

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'sofiabruno3003', // generated ethereal user
                pass: 'davmark11' // generated ethereal password
            }
        });

        let randomCode = Math.floor(1000 + Math.random() * 9000);
        console.log("CODE" + randomCode)
        // console.log(process.env)

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Secret South " <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: 'Password Reset', // Subject line
            text: 'You recently requested a password reset', // plain text body
            html: `${randomCode}` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(error)
            if (error) {
                res.status(500).json({msg: error.toString()})
            } else if (info) {

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.json(randomCode);
            }


        });
    }
};


exports.changeForgottenPassword = async (req, res) => {
    console.log('here!!!!')
    let data = req.body;
    let newPassword = data.new_password;
    let foundUser = await Users.findOne({where: {email: data.email}});


    if (!foundUser) {
        res.status(500).json('User is not found');
    } else {

        data.password = bcrypt.hashSync(newPassword, 10);

        await to(Users.update({password: data.password}, {where: {email: data.email}}), res);
        res.json('OK')
    }

};
