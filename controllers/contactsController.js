exports.request = async (req, res) => {
    await Contacts.create(req.body);
    res.json('OK');
};


exports.get = async (req, res) => {
    const contacts = await Contacts.findAll();
    res.json(contacts);
};

exports.getOne = async (req, res) => {
    const contacts = await Contacts.findOne({where:{id:req.query.id},attributes: {exclude: ['id','accepted']}});
    res.json(contacts);
};

exports.remove = async (req, res) => {
    let data = req.query;
    await Contacts.destroy({where: {id: data.id}});
    this.get(req, res);
};
