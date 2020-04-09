const ordersController = require('./controllers/ordersController');
const chatController = require('./controllers/chatController');

const socketIDs = [];
let connectedUsers = [];
const users = {};
exports.socket = (io) => {
    io.on('connection', (socket) => {
        socketIDs.push(socket.id);
        console.log('Connected:%s sockets connected', socketIDs.length)
        // Get all connected users names
        socket.on('update-connected-users', () => {
            console.log('update-connected-users!!!!!!')
            io.sockets.emit('update-usernames', connectedUsers)
        });

        // New user joining
        socket.on('newUser', (user) => {
            console.log('new user')
            users[user.socket_nickname] = socket;
            updateConnectedUsers(user);
        });


        // Send message
        socket.on('sendMessage', async (data) => {
            let receiver = data.to;
            console.log(data)
            await chatController.create(data);
            if (users[receiver]) {
                users[receiver].emit('messageSent', data);
            }
            else console.log('Receiver not found!!!')
        });

        // Create order by customer
        socket.on('createOrder', async (dt) => {
            let data = JSON.parse(dt);
            let result = await ordersController.create(dt);
            let sendData = {status: 200, order: result, msg: 'Order is created!'};
            if (users['Operator']) {
                users['Operator'].emit('orderCreated', sendData);
            }
            else console.log('Operator not found!!!')
            socket.emit('orderCreated', sendData);
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
                connectedUsers.push({username, email: user.email, id:user.id});
            }
            io.sockets.emit('update-usernames', connectedUsers)
        }

        function sendBack() {

        }
    })
}
