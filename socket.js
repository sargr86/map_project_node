const ordersController = require('./controllers/ordersController');

const socketIDs = [];
let connectedUsers = [];
const users = {};
exports.socket = (io) => {
    io.on('connection', (socket) => {
        socketIDs.push(socket.id);

        socket.on('get-connected-users', () => {
            console.log('get-connected-users!!!!!!')
            console.log(connectedUsers)
            io.sockets.emit('update-usernames', connectedUsers)
        });

        // New user (separated operator)
        socket.on('newUser', (user) => {
            console.log('new user@!!!!')
            // Separating operator socket id
            if (user.socket_nickname === 'Operator') {
                console.log('operator!!!')
                io.sockets.emit('onlineOperatorId', socket.id)
            }

            users[user.socket_nickname.replace(/ /g, '_')] = socket;

            updateConnectedUsers(user);
        });


        // Send message
        socket.on('sendMessage', (data) => {
            let receiver = data.to.replace(/ /g, '_');
            users[receiver].emit('messageSent', data);
        });

        // Create order by customer
        socket.on('createOrder', async (dt) => {
            let data = JSON.parse(dt);
            let result = await ordersController.create(dt);
            let sendData = {status: 200, order: result, msg: 'Order is created!'};
            if (socketIDs.includes(data.operatorId)) {
                io.sockets.sockets[data.operatorId].emit('orderCreated', sendData);
                socket.emit('orderCreated', sendData);
            } else {
                console.log('operator id is not found!!!')
            }
        });

        // Driver assigned
        socket.on('driverAssigned', async (data) => {
            await ordersController.assignBoatToDriver(data.selectedOrder);
            let changedOrder = await ordersController.getOrderById(data.selectedOrder);
            let clientFullName = (changedOrder.client.first_name + '_' + changedOrder.client.last_name).replace(/ /g, '_');
            console.log(clientFullName)
            console.log(Object.keys(users))
            users[clientFullName].emit('driverAssignmentFinished', changedOrder);
            users['Operator'].emit('driverAssignmentFinished', changedOrder);
            let driverFullName = changedOrder.driver.full_name.replace(/ /g, '_');
            users[driverFullName].emit('driverAssignmentFinished', changedOrder);
        });


        // Order is taken by a driver
        socket.on('orderTaken', async (data) => {
            data.status = 'ongoing';
            data.id = data._id;
            await ordersController.changeStatusFromSocket(data);
            let changedOrder = await ordersController.getOrderById(data);
            let clientFullName = (changedOrder.client.first_name + '_' + changedOrder.client.last_name).replace(/ /g, '_');
            users[clientFullName].emit('orderTakenFinished', changedOrder);
            users['Operator'].emit('orderTakenFinished', changedOrder);
            let driverFullName = changedOrder.driver.full_name.replace(/ /g, '_');
            users[driverFullName].emit('orderTakenFinished', changedOrder);
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

        // Disconnect
        socket.on('disconnect', () => {
            socketIDs.splice(socketIDs.indexOf(socket), 1);
            delete users[socket.username]; // removing by saved username in newUser event
            connectedUsers = connectedUsers.filter(u => u.username !== socket.username);
            io.sockets.emit('update-usernames', connectedUsers)
            console.log('user disconnected')
        });

        function updateConnectedUsers(user) {
            let username = user.socket_nickname;
            socket.username = username; // for disconnect
            if (!(connectedUsers.find(u => u.username === username))) {
                connectedUsers.push({username, email: user.email});
            }
            io.sockets.emit('update-usernames', connectedUsers)
        }

        function sendBack() {

        }
    })
}
