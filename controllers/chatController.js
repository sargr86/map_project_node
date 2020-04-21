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
            {from_user_id: data.user_id}, {to_user_id: data.user_id}
        ]
    });
    res.json(result);
};


exports.updateSeen = async (req, res) => {
    let data = req.body;
    await Messages.updateMany({to_user_id: data.from_user_id}, {"$set": {"seen": true}}, {"multi": true});

    let messages = await Messages.find({
        to_user_id: data.user_id
    });

    res.json(messages)

};
