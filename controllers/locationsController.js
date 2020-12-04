exports.get = async (req, res) => {
    const l = await Locations.findAll({});
    res.json(l);
};
