const router = express.Router();

router.post('/me', checkAuth, async (req, res)=> {

    // Getting request data and setting user fields to return
    let data = req.decoded;
    let email = data.email.trim();

    // let userType = data.userType ? 'Partner' : 'Admin';


    let attributes = [`first_name`, `last_name`, 'email', 'profile_img', 'password', 'id', 'status_id','phone'];

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
            {model: PartnerTypes}
        ],
        where: {email: email} //userTypeWhere
    }, res);


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
});


module.exports = router;
