const Orders = require('../mongoose/orders');
const moment = require('moment');
const usersController = require('./usersController');
const UsersCards = db.users_cards;
exports.create = async (orderData) => {


    let data = JSON.parse(orderData);
    console.log("ORDER DATA!!!!")
    console.log(data)
    console.log("ORDER DATA!!!!")


    // let stripeUserFound = await UsersCards.findOne({where: {user_id: data.user_id}});


    // let charges = await stripe.charges.create({
    //     amount: data.price,
    //     description: 'Boat Ticket',
    //     currency: 'eur',
    //     customer: data.client.stripe_customer_id
    // });
    //
    // console.log(charges)


    // Checking for user stripe status
    // const customerInfo = usersController.getCustomerInfo();


    let newMsg = new Orders(data);
    let result = await to(newMsg.save());
    return result;
};

exports.getByStatus = async (req, res) => {
    let data = req.query;
    // console.log(data)
    let where = data.status !== 'all' ? {status: data.status} : {};
    if (data.hasOwnProperty('driverEmail')) {
        where['driver.email'] = data.driverEmail;
    } else if (data.hasOwnProperty('customerEmail')) {
        where['client.email'] = data.customerEmail;
    }
    // console.log(where)
    const orders = await Orders.find(where);
    res.json(orders)
};

exports.getAllOrdersCounts = async (req, res) => {
    const data = req.query;
    let where = {};
    if (data.hasOwnProperty('driverEmail')) {
        where['driver.email'] = data.driverEmail;
    } else if (data.hasOwnProperty('customerEmail')) {
        where['client.email'] = data.customerEmail;
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
    // console.log(req.query)
    let data = req.query;
    let condition = {'client.email': data.email, status: {$nin: ['cancelled', 'finished']}};
    if (data.dateVal) {
        const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');
        condition.created = {$gt: data.dateVal, $lt: tomorrow};
    }

    const orders = await Orders.find(condition);
    res.json(orders)
};

exports.getAllUserOrders = async (req, res) => {
    const orders = await Orders.find({'client.email': req.query.email});
    res.json(orders)
};

exports.getUserInactiveOrders = async (req, res) => {
    const orders = await Orders.find({'client.email': req.query.email, status: {$in: ['cancelled', 'finished']}});
    res.json(orders)
};

exports.getDriverActiveOrders = async (req, res) => {
    const orders = await Orders.find({
        'driver.email': req.query.email,
        status: {$nin: ['pending', 'cancelled', 'finished']}
    });
    res.json(orders)
};

exports.getDriverInactiveOrders = async (req, res) => {
    const orders = await Orders.find({'driver.email': req.query.email, status: {$in: ['cancelled', 'finished']}});
    res.json(orders)
};

exports.getAllDriverOrders = async (req, res) => {
    const orders = await Orders.find({'driver.email': req.query.email});
    res.json(orders)
};

exports.changeStatus = async (req, res) => {
    let data = req.body;
    // console.log(data)

    let order = await Orders.findOne({_id: data.id});
    // await Orders.updateOne({id: data.id}, {status: data.status});
    // await Orders.update({id: data.id}, {$set: {status: data.status}});
    order.status = data.status;
    await order.save();
    res.json("OK")
};

// Changing orders statuses and assigning driver to a boat from here
exports.changeStatusFromSocket = async (data, status) => {
    let order = await Orders.findOne({_id: data.id});

    // Assigns a boat to the selected driver for assigned status
    if (status === 'assigned') {
        order.driver = data.driver;
        order.ferry = data.driver.ferry;
    }
    order.status = status;
    await order.save();
};

exports.getOrderById = async (data) => {
    const order = await Orders.findOne({_id: data._id});
    return order;
};

exports.rateDriver = async (data) => {


    let orderId = data.order_id;
    let driverId = data.driver_id;
    let customerId = data.customer_id;
    delete data.order_id;
    delete data.driver_id;
    delete data.customer_id;
    let order = await Orders.findOne({_id: orderId});
    order.rating = data;
    await order.save();
    //
    // await Ratings.update({driver_id: data.driver_id}, {where: {id: data.ferry_id}});
    let rating = await to(Ratings.findOrCreate({
            where: {
                driver_id: data.driver_id,
                customer_id: data.customer_id
            },
            defaults: {
                driver_feedback: data.driver_feedback,
                driver_rating: data.driver_rating,
                driver_id: driverId,
                customer_id: customerId,
                order_id: orderId
            },

        }).spread((item) => {
            // console.log(item)
            return item;
            // return item.get({
            //     plain: true
            // });
        })
    );


    return order;


    // res.json("OK")
};


// Works from routes (test method!!!)
exports.createFromReq = async (req, res) => {
    let data = req.body;
    let orderId = data.order_id;
    delete data.order_id;
    delete data.driver_id;
    delete data.customer_id;

    let order = await Orders.findOne({_id: orderId});
    order.rating = data;
    console.log("RATE DRIVER!!!!")
    console.log(data)
    console.log(order)
    await order.save();
    res.json("OK");
};
