let mongoose = require('mongoose')
const moment = require('moment');

// connects to mongo db
// mongoose.connect('mongodb://localhost/chat');

let FerryRoutesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    start_point: {
        type: String
    },
    stop_1: {
        type: String
    },
    stop_2: {
        type: String
    },
    end_point: {
        type: String
    },
    single: {
        type: Number
    },
    total: {
        type: Number
    },
    min_people: {
        type: Number,//@todo add default of min 6 people here
    },
    geometryType: {
        type: String
    },
    coordinates: {
        type: [
            {lat: {type: Number}, lng: {type: Number}}
        ]
    },

    created: {
        type: Date,
        default: moment().format()
    }

}, {strict: false});

module.exports = mongoose.model('Ferry_Routes', FerryRoutesSchema);
