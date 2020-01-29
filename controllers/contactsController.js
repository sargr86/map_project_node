exports.request = async (req, res) => {
    await Contacts.create(req.body);
    res.json('OK');
};
