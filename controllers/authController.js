require('../constants/sequelize');

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

            let role = await Roles.findOne({
                where: {name_en: { [Op.like]: `%${data.user_type}%` } }, attributes: ['id']
            });
            data.role_id = role.toJSON()['id'];

            let partner_type = await PartnerTypes.find({
                where: {id: data.field_type}
            });
            data.partner_type_id = partner_type.toJSON()['id'];


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


        let attributes = [`first_name`, `last_name`, 'email', 'profile_img', 'password', 'id', 'status_id'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

        // let userTypeWhere = sequelize.where(sequelize.col('`role.name_en`'), userType);


        // Selecting an employee that has an email matching request one
        let user = await Users.findOne({
            attributes: attributes,
            include: [
                {model: UsersStatuses, attributes: ['name_en', 'id'], where: {statusWhere}},
                {model: Roles, attributes: ['name_en', 'id']},// where: {userTypeWhere},
                {model: PartnerTypes}
            ],
            where: {email: email} //userTypeWhere
        }, res);


        console.log('here!!!!!')
        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

            else {
                // Cloning users object without password and saving user full name
                let {password, ...details} = user.toJSON();
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
    let lang = data.lang;

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

            let result = await to(Users.update(fields, {where: {id: data.id}}), res)
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
    let user = await Users.findOne({where: {email: email}, attributes: attributes})
    res.json(user);
};
