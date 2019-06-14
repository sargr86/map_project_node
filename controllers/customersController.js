/**
 * Gets all customers list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {

    let data = req.query;

    // Active status selecting
    let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

    let userTypeWhere = sequelize.where(sequelize.col('`role.name_en`'), 'Customer');

    let result = await Users.findAll({
        include: [
            {model: UsersStatuses, attributes: ['name_en', 'id'], where: {statusWhere}},
            {model: Roles, attributes: ['name_en', 'id'], where: {userTypeWhere}},
        ],
    });
    res.json(result);
};
