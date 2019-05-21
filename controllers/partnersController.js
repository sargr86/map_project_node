require('../constants/sequelize');
const nodemailer = require('nodemailer');

const authController = require('./authController');
/**
 * Gets all partners list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {

    // Active status selecting
    let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

    let userTypeWhere = sequelize.where(sequelize.col('`role.name_en`'), 'Partner');


    let result = await Users.findAll({
        include: [
            {model: UsersStatuses, attributes: ['name_en', 'id'], where: {statusWhere}},
            {model: Roles, attributes: ['name_en', 'id'], where: {userTypeWhere}},
            {model: PartnerTypes}
        ],
    });
    res.json(result);
};

/**
 * Gets one partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await Users.findOne({
        where: {id: data.id}, attributes: ['first_name', 'last_name', 'email', 'partner_type_id', 'id', 'phone'],
        include: [
            {model: PartnerTypes}
        ]
    });
    res.json(result);
};

/**
 * Gets partner types list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTypes = async (req, res) => {
    let result = await to(PartnerTypes.findAll({}));
    res.json(result);
};

/**
 * Adds a new partner
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {
    authController.register(req, res);
};

/**
 * Removes a partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    await Users.destroy({where: {id: data.id}});
    this.get(req, res);
};

/**
 * Updates a partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    let data = req.body;
    let id = data.id;
    delete data.id;
    await Users.update(data, {where: {id: id}});
    this.get(req, res);
};

/**
 * Partner login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
    req.body.userType = 'partner';
    authController.login(req, res);
};

/**
 * Inviting a new partner
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.invite = async (req, res) => {
    console.log(req.body)

    const email = 'sargr86@mail.ru';
    const user = req.body;

    let tempToken = jwt.sign({
        email: user.email,
        id: user.id,

        first_name: user.first_name,
        last_name: user.last_name,

        full_name: user.first_name + ' ' + user.last_name,
    }, 'secretkey', {expiresIn: '1h'});

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sargr1986@gmail.com', // generated ethereal user
            pass: 'sargr1986' // generated ethereal password
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Secret South " <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Invitation', // Subject line
        text: 'You recently requested a password reset', // plain text body
        html: `<h1 style="color:#747474a3">Hello, dear ` + user.first_name + ' ' + user.last_name + `!</h1>
                                <b>You have recently been invited to register in our system.
                                Please follow  <a target="_self" href="http://localhost:4200/auth/register?token=` + tempToken + `">this link</a>
                                 to complete the process</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json("OK");


    });


};
