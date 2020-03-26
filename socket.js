const ordersController = require('./controllers/ordersController');
const validateOrder = require('./validators/validateOrder');
let users = {};
let connections = [];
const validator = require('validator');
exports.socket = (io) => {
    io.on('connection', async (socket) => {

        connections.push(socket);

        console.log('Connected:%s sockets connected', connections.length)


        // Creating an order
        socket.on('createOrder', async (data) => {
            // console.log(validateOrder.rules)

            // console.log(data)
            // console.log(validator.isEmpty(data.client.email))


            console.log('creating order')
            let result = await ordersController.create(data);
            // let customerOrders = await ordersController.getOne({email:data.client.email});
            // console.log(result)
            io.sockets.emit('orderCreated', {status: 200, order: result, msg: 'Order is created!'})
        });

        // Driver assigned
        socket.on('driverAssigned', async (data) => {
            await ordersController.assignBoatToDriver(data.selectedOrder);
            let changedOrder = await ordersController.getOrderById(data.selectedOrder);
            // data.selectedOrder.status = 'assigned';
            io.sockets.emit('driverAssignmentFinished', changedOrder)
        });

        // Order is taken by a driver
        socket.on('orderTaken', async (data) => {
            console.log("ORDER TAKEN")
            data.status = 'ongoing';
            data.id = data._id;
            await ordersController.changeStatusFromSocket(data);
            let changedOrder = await ordersController.getOrderById(data);
            io.sockets.emit('orderTakenFinished', changedOrder)
        });

        socket.on('arrivedToOrder', async (data) => {
            data.status = 'arrived';
            data.id = data._id;
            await ordersController.changeStatusFromSocket(data);
            let changedOrder = await ordersController.getOrderById(data);
            io.sockets.emit('arrivedToOrderFinished', changedOrder)
        });

        socket.on('startOrder', async (data) => {
            data.status = 'started';
            data.id = data._id;
            await ordersController.changeStatusFromSocket(data);
            let changedOrder = await ordersController.getOrderById(data);
            io.sockets.emit('orderStarted', changedOrder)
        });

        socket.on('finishOrder', async (data) => {
            console.log("FINISH ORDER!!!!!!")
            data.status = 'finished';
            data.id = data._id;
            await ordersController.changeStatusFromSocket(data);
            let changedOrder = await ordersController.getOrderById(data);
            io.sockets.emit('orderFinished', changedOrder)
        });

        socket.on('rateDriver', async (data) => {
            data = JSON.parse(data);
            // console.log(validator.isEmpty(data.driver_feedback))
            await ordersController.rateDriver(data);
            io.sockets.emit('ratedDriver', data)
        });

        // Log out
        socket.on('logout', () => {
            if (!socket.nickname) return;
            delete users[socket.nickname];
        });

        // Disconnect
        socket.on('disconnect', () => {
            connections.splice(connections.indexOf(socket), 1)
            console.log('Disconnected:%s sockets connected', connections.length)
            console.log('user disconnected');
        });
    });

};
