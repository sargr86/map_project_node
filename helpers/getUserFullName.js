require('../constants/sequelize');


module.exports = (fNameCol,lNameCol, delimiter = ' ', returnName = 'full_name')=>{
    return [sequelize.fn('concat', sequelize.col(fNameCol), delimiter, sequelize.col(lNameCol)), returnName]
};
