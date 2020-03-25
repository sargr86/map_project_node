require('../constants/sequelize');

/**
 * Gets user data by request id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUserById = async (req, res) => {
    let data = req.query;
    let result = await to(Users.findOne({
        where: {id: data.id},
        attributes: ['id', 'email', 'gender', 'profile_img', `first_name`, `last_name`, 'birthday', 'phone'],
        include: [{model: Roles, attributes: ['name_en']}]
    }), res);
    res.json(result)
};

/**
 * Gets user list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUsers = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let attributes = ['id', 'email', 'gender', 'profile_img', 'birthday'];
    attributes.push(fullName(`first_name_${lang}`, `last_name_${lang}`));
    let result = await to(Users.findAll({
        attributes: attributes,
        include: [
            {model: UsersStatuses}
        ]
    }), res);
    res.json(result)
};

/**
 * Changes the selected user status
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.changeUserStatus = async (req, res) => {
    let data = req.body;
    let status = await UsersStatuses.findOne({where: {name_en: data.status}, attributes: ['id']});

    await Users.update({status_id: status.id}, {where: {id: data.id}});
    req.query = data;
    this.getUsers(req, res);
};

exports.getUsersByRole = async (req, res) => {
    let data = req.query;
    let attributes = [[sequelize.fn('concat', sequelize.col('first_name'), ' ', sequelize.col('last_name')), 'full_name'], 'id', 'phone', 'email', 'gender', 'profile_img', 'birthday'];

    let result = await to(Users.findAll({
        attributes: attributes,
        include: [
            {model: Positions, where: {name: data.position}},
            {model: Ferries, include: [{model: Companies}]},

        ],

    }), res);
    res.json(result)
};
