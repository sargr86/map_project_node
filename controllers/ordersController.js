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
    let data = req.query;
    let where = data.status !== 'all' ? {status: data.status} : {};
    if (data.hasOwnProperty('driverEmail')) {
        where['driver.email'] = data.driverEmail;
    }
    console.log(where)
    const orders = await Orders.find(where);
    res.json(orders)
};

exports.getAllOrdersCounts = async (req, res) => {
    const data = req.query;
    let where = {};
    if (data.hasOwnProperty('driverEmail')) {
        where['driver.email'] = data.driverEmail;
    }


    const aggregatorOpts = [
        {$match: where},
        // {
        // $unwind: "$items"
        // },
        {
            $group: {
                _id: "$status",
                count: {$sum: 1},
            },

        },
        {
            $group: {
                _id: "total",
                count: {$sum: "$count"},
                statuses: {$push: {name: "$_id", count: "$count"}}
            }
        },

    ];

    const orders = await Orders.aggregate(aggregatorOpts).exec();
    res.json(orders[0]);
};

exports.getUserActiveOrders = async (req, res) => {
    console.log(req.query)
    const orders = await Orders.find({'client.email': req.query.email, status: {$nin: ['cancelled', 'finished']}});
    res.json(orders)
};

exports.getAllUserOrders = async (req, res) => {
    const orders = await Orders.find({'client.email': req.query.email});
    res.json(orders)
};

exports.getUserInactiveOrders = async(req,res)=>{
    const orders = await Orders.find({'client.email': req.query.email,status: {$in: [ 'cancelled', 'finished']}});
    res.json(orders)
};

exports.getDriverActiveOrders = async (req, res) => {
    const orders = await Orders.find({
        'driver.email': req.query.email,
        status: {$nin: ['pending', 'cancelled', 'finished']}
    });
    res.json(orders)
};

exports.getDriverInactiveOrders = async(req,res)=>{
    const orders = await Orders.find({'driver.email': req.query.email,status: {$in: [ 'cancelled', 'finished']}});
    res.json(orders)
};

exports.getAllDriverOrders = async (req, res) => {
    const orders = await Orders.find({'driver.email': req.query.email});
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

exports.changeStatusFromSocket = async (data) => {
    console.log(data)
    let order = await Orders.findOne({_id: data.id});
    order.status = data.status;
    await order.save();
};

// Assigns a boat to the selected driver
exports.assignBoatToDriver = async (data) => {
    if (data) {
        console.log("ASSIGN")
    console.log(data)

        let order = await Orders.findOne({_id: data._id});
        order.driver = data.driver;
        order.ferry = data.driver.ferry;
        order.status = 'assigned';
        await order.save();
    }
};

exports.getOrderById = async (data) => {
    let order = await Orders.findOne({_id: data._id});
    return order;
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
