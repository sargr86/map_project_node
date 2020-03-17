const Orders = require('../mongoose/orders');
exports.create = async (orderData) => {
    const testOrder = {
        "startPoint": {
            "name": "Crosshaven",
            "coordinate": {"latitude": 51.804713, "longitude": -8.298334}
        },
        "endPoint": {"name": "Fountainstown", "coordinate": {"latitude": 51.775695, "longitude": -8.311389}},
        "wayType": 1,
        "time": "9 : 00",
        "more": {"children": "0", "bike": false},
        "payment": 1
    };
    let newMsg = new Orders(JSON.parse(orderData));
    let result = await to(newMsg.save());
    return result;
};

exports.getAll = async(req, res) => {
   const orders = await Orders.find({});
    res.json(orders)
};


// Works from routes (test method!!!)
exports.createFromReq = async (req, res) => {
    const orderData = req.body;
    if (!showIfErrors(req, res)) {
        //{
        //         "name": "Crosshaven",
        //          "coordinate": {"latitude": 51.804713, "longitude": -8.298334}
        //   }
        res.json('OK');

    }
    // console.log(orderData)
    // const testOrder = {
    //     "startPoint": {
    //         "name": "Crosshaven",
    //         "coordinate": {"latitude": 51.804713, "longitude": -8.298334}
    //     },
    //     "endPoint": {"name": "Fountainstown", "coordinate": {"latitude": 51.775695, "longitude": -8.311389}},
    //     "wayType": 1,
    //     "time": "9 : 00",
    //     "more": {"children": "0", "bike": false},
    //     "payment": 1
    // };
    // let newMsg = new Orders(orderData);
    // let result = await to(newMsg.save());
};
