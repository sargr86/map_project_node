require('../constants/sequelize');
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
            {model:PartnerTypes}
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
        where: {id: data.id}, attributes: ['first_name', 'last_name', 'email', 'partner_type_id', 'id','phone'],
        include:[
            {model:PartnerTypes}
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
    authController.register(req,res);
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
    authController.login(req,res);
};