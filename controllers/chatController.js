const Messages = require('../mongoose/messages');
const moment = require('moment');
exports.create = async (data) => {
    data.seen_at = '';
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
    console.log('update seen!!!')
    console.log(req.body)
    console.log('update seen!!!')
    let data = req.body;
    await Messages.updateMany({to_user_id: data.from_user_id, seen: false}, {
        "$set": {
            "seen": true,
            "seen_at": moment().format(data.seen_at)
        }
    }, {"multi": true});


    let messages = await Messages.find({
        to_user_id: data.user_id
    });

    res.json(messages)

};
