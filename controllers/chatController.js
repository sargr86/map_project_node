const Messages = require('../mongoose/messages');

exports.create = async (data) => {
    let newMsg = new Messages(data);
    let result = await to(newMsg.save());
    return result;
};


exports.getMessages = async (req, res) => {
    let data = req.query;
    let result = await Messages.find({
        $or: [
            {from_email: data.email}, {to_email: data.email}
        ]
    });
    res.json(result);
};
