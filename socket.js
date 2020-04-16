const ordersController = require('./controllers/ordersController');
const chatController = require('./controllers/chatController');

const socketIDs = [];
let connectedUsers = [];
const users = {};
exports.socket = (io) => {
    io.on('connection', (socket) => {
        socketIDs.push(socket.id);
        // console.log('Connected:%s sockets connected', socketIDs.length)
        // Get all connected users names (for operator)
        socket.on('update-connected-users', () => {
            io.sockets.emit('update-usernames', connectedUsers)
        });

        // New user joining
        socket.on('newUser', (user) => {
            console.log(`${user.socket_nickname} is a new user`);
            users[user.socket_nickname] = socket;
            socket.emit('newUser', 'connected')
            updateConnectedUsers(user);
        });


        // Send message
        socket.on('sendMessage', async (data) => {
            let receiver = data.to;
            let currentMsg = await chatController.create(data);
            console.log(currentMsg)
            socket.emit('messageSent', currentMsg);
            console.log(Object.keys(users))

            if (users[receiver]) {
                console.log('Receiver found!!!')
                users[receiver].emit('messageSent', currentMsg);
            } else console.log('Receiver not found!!!')
        });

        //Someone is typing a message
        socket.on('typing', (data, callback) => {
            socket.broadcast.emit('typing', data)
        });

        // Create order by customer
        socket.on('createOrder', async (dt) => {
            let data = JSON.parse(dt);
            let result = await ordersController.create(dt);
            let sendData = {status: 200, order: result, msg: 'Order is created!'};

            // Sending to operator
            if (users['Operator']) {
                users['Operator'].emit('orderCreated', sendData);
            } else console.log('Operator not found!!!');

            // Sending back to the client
            socket.emit('orderCreated', sendData);
        });

        // Driver assigned
        socket.on('driverAssigned', async (data) => {
            data.id = data._id;
            await getChangedOrderSendBack(data, 'assigned', 'driverAssignmentFinished');
        });


        // Order is taken by a driver
        socket.on('orderTaken', async (data) => {
            data.id = data._id;
            await getChangedOrderSendBack(data, 'ongoing', 'orderTakenFinished');
        });

        // Driver is arrived to an order
        socket.on('arrivedToOrder', async (data) => {
            data.id = data._id;
            await getChangedOrderSendBack(data, 'arrived', 'arrivedToOrderFinished');
        });

        // Driver has started an order
        socket.on('startOrder', async (data) => {
            data.id = data._id;
            await getChangedOrderSendBack(data, 'started', 'orderStarted');
        });

        // Driver has finished an order
        socket.on('finishOrder', async (data) => {
            data.id = data._id;
            await getChangedOrderSendBack(data, 'finished', 'orderFinished');
        });
        // Log out
        socket.on('logout', () => {
            console.log(socket.username + ' logout')
            if (!socket.username) return;
            delete users[socket.username];
            connectedUsers = connectedUsers.filter(u => u.username !== socket.username);
            io.sockets.emit('update-usernames', connectedUsers)
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log('disconnect')
            socketIDs.splice(socketIDs.indexOf(socket), 1);
            delete users[socket.username]; // removing by saved username in newUser event
            connectedUsers = connectedUsers.filter(u => u.username !== socket.username);
            io.sockets.emit('update-usernames', connectedUsers)
            console.log('user disconnected')
        });

        function updateConnectedUsers(user = {}) {
            if (Object.keys(user).length === 0 && user.constructor === Object) {
                return '';
            } else {
                let username = user.socket_nickname;
                socket.username = username; // for disconnect
                if (!(connectedUsers.find(u => u.username === username))) {
                    connectedUsers.push({username, email: user.email, id: user.id, socket_nickname: user.socket_nickname});
                }
                io.sockets.emit('update-usernames', connectedUsers)
            }
        }

        async function getChangedOrderSendBack(data, status, eventBack) {

            // Update current order status and get its changed details
            await ordersController.changeStatusFromSocket(data, status);
            let changedOrder = await ordersController.getOrderById(data);

            // Sending to the client & operator
            let clientFullName = changedOrder.client.socket_nickname;
            if (users[clientFullName]) {
                users[clientFullName].emit(eventBack, changedOrder);
            } else console.log('client not found!!!')
            if (users['Operator']) {
                users['Operator'].emit(eventBack, changedOrder);
            } else console.log('operator not found!!!')

            // Sending to the assigned driver
            let driverFullName = changedOrder.driver.full_name.replace(/ /g, '_');
            if (driverFullName && users[driverFullName]) {
                users[driverFullName].emit(eventBack, changedOrder);
            } else console.log('driver not found!!!')
        }
    })
};
