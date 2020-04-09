let mongoose = require('mongoose')
const moment = require('moment');

// connects to mongo db
// mongoose.connect('mongodb://localhost/chat');

let MessagesSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    from_user_id: {
        type: Number,
        required: true
    },
    msg: {
        type: String
    },
    to: {
        type: String,
        required: true
    },
    to_user_id: {
        type: Number,
    },
    created: {
        type: Date,
        default: moment().format()
    }

});

module.exports = mongoose.model('Messages', MessagesSchema);
