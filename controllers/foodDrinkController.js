/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async(req,res) =>{
  let result = await to(FoodDrink.findAll({}));
  res.json(result);
};