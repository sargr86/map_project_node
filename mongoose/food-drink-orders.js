let mongoose = require('mongoose')
const moment = require('moment');

// connects to mongo db
// mongoose.connect('mongodb://localhost/chat');

let OrderSchema = new mongoose.Schema({
    client: {
        type: {
            first_name: {type: String},
            last_name: {type: String},
            card_id: {type: String},
            stripe_customer_id: {type: String},
            socket_nickname: {type: String},
            email: {type: String},
            phone: {type: String}
        },
        // required: true
    },
    location:{
        type: String,
    },
    address: {
        type: String,
    },
    guests: {
        type: Number
    },
    price: {
        type: Number
    },
    date: {
        type: String,
        // required: true
    },

    time: {
        type: String,
        // required: true
    },

    payment: {
        type: String,
        default: false
    },
    status: {
        type: String,
        default: false
    },
    created: {
        type: Date,
        default: moment().format()
    }

});

module.exports = mongoose.model('Food_Drink_Orders', OrderSchema);
