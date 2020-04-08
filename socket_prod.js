const ordersController = require('./controllers/ordersController');
const chatController = require('./controllers/chatController');
const validateOrder = require('./validators/validateOrder');
const validator = require('validator');


let connections = [];
let users = {};
let connectedUsers = []
exports.socket = (io) => {
    io.on('connection', async (socket) => {
        connections.push(socket.id);
        socket.emit("your-socket-id", socket.id);
        console.log('User connected: ' + socket.id);
        console.log('Connected:%s sockets connected', connections.length)

        socket.on('newUser', (user) => {
            let roomName;
            roomName = user.email + '->Admin';
            socket.join(roomName);
            console.log(user.socket_nickname + ' joined room:' + roomName)
            socket.emit('joinedRoom', roomName)
            // console.log(user)
            let username = user.socket_nickname;
            // users[username] = socket.id;
            socket.username = username; // for disconnect
            if (!(connectedUsers.find(u => u.username === username))) {
                connectedUsers.push({username, email: user.email});
            }
            // console.log(users)
            io.sockets.emit('update-usernames', connectedUsers)
        });


        socket.on('sendMessage', async (data) => {
            let socketId = users[data.to];
            let roomName = data.roomName;
            console.log(data)
            console.log(users)
            console.log(socketId)
            // console.log(Object.keys(io.sockets.sockets))
            // console.log('=======')
            // console.log(connections)
            // io.to(socketId).emit('messageSent',data.message)
            console.log('send message')
            await chatController.create(data);
            socket.to(roomName).emit('messageSent', data)
            // if (socketId) {
            //     io.sockets.sockets[socketId].emit('messageSent', data)
            // }
        });

        // Creating an order
        socket.on('createOrder', async (dt) => {
            let data = JSON.parse(dt);
            // console.log(validateOrder.rules)
            console.log(socket.id)

            // console.log(data)
            // console.log(validator.isEmpty(data.client.email))


            console.log('creating order!!!')
            // console.log(data.client.first_name + ' ' + data.client.last_name)
            console.dir(Object.keys(users))

            // let result = await ordersController.create(dt);
            // let customerOrders = await ordersController.getOne({email:data.client.email});
            // console.log(result)
            // io.sockets.emit('orderCreated', {status: 200, order: result, msg: 'Order is created!'})
        });

        // Driver assigned
        socket.on('driverAssigned', async (data) => {
            await ordersController.assignBoatToDriver(data.selectedOrder);
            let changedOrder = await ordersController.getOrderById(data.selectedOrder);
            // data.selectedOrder.status = 'assigned';
            let clientFullName = changedOrder.client.first_name + '_' + changedOrder.client.last_name;
            let driverFullName = changedOrder.driver.full_name.replace(' ', '_');
            console.log("CLIENT:" + clientFullName, "DRIVER:" + driverFullName);
            console.dir(Object.keys(users))
            console.log("SOCKET NICKNAME:" + socket.nickname)
            users[clientFullName].emit('driverAssignmentFinished', changedOrder);
            users['John_Doe'].emit('driverAssignmentFinished', changedOrder);
            // users[driverFullName].emit('driverAssignmentFinished', changedOrder);
            // io.sockets.emit('driverAssignmentFinished', changedOrder)
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
            let changedOrder = await ordersController.rateDriver(data);
            io.sockets.emit('ratedDriver', changedOrder)
        });


        // Disconnect
        socket.on('disconnect', () => {
            connections.splice(connections.indexOf(socket), 1)
            console.log('Disconnected:%s sockets connected', connections.length)
            delete users[socket.username]; // removing by saved username in newUser event
            connectedUsers = connectedUsers.filter(u => u.username !== socket.username);
            console.log(connectedUsers)
            io.sockets.emit('update-usernames', connectedUsers)
            console.log('user disconnected');
        });

        socket.on('disconnect-all', () => {
            Object.keys(io.sockets.sockets).forEach(function (s) {
                io.sockets.sockets[s].disconnect(true);
            });
        })
    });

};
