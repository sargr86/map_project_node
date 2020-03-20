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

exports.getByStatus = async (req, res) => {
    let status = req.query.status !== 'all' ? {status: req.query.status} : {};
    const orders = await Orders.find(status);
    res.json(orders)
};

exports.getActiveOrders = async (req, res) => {
    console.log(req.query)
    const orders = await Orders.find({'client.email': req.query.email, status: {$nin: ['cancelled', 'finished']}});
    res.json(orders)
};

exports.getUserOrders = async (req, res) => {
    const orders = await Orders.find({'client.email': req.query.email});
    res.json(orders)
};

exports.changeStatus = async (req, res) => {
    let data = req.body;
    console.log(data)

    let order = await Orders.findOne({_id: data.id});
    // await Orders.updateOne({id: data.id}, {status: data.status});
    // await Orders.update({id: data.id}, {$set: {status: data.status}});
    order.status = data.status;
    await order.save();
    res.json("OK")
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
