let mongoose = require('mongoose')
const moment = require('moment');

// connects to mongo db
// mongoose.connect('mongodb://localhost/chat');

let MessagesSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    from_email: {
        type: String,
        required: true
    },
    msg: {
        type: String
    },
    to: {
        type: String,
        required: true
    },
    to_email: {
        type: String,
    },
    created: {
        type: Date,
        default: moment().format()
    }

});

module.exports = mongoose.model('Messages', MessagesSchema);
