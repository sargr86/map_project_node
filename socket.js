const ordersController = require('./controllers/ordersController');
const validateOrder = require('./validators/validateOrder');
let users = {};
let connections = [];
exports.socket = (io) => {
    io.on('connection', async (socket) => {

        connections.push(socket);

        console.log('Connected:%s sockets connected',connections.length)


        // console.log('user connected');
        socket.on('createOrder', async (data) => {
            // console.log(validateOrder.rules)


            // Getting validation result from express-validator
            const errors = validationResult(data);

            // Handling validation errors
            if (!errors.isEmpty()) {
                console.log(errors)
                console.log(errors.array)
                let singleError = errors.array()[0];
                console.log(singleError)
            }


            console.log('creating order')
            let result = await ordersController.create(data);
            // let customerOrders = await ordersController.getOne({email:data.client.email});
            // console.log(result)
            io.sockets.emit('orderCreated', {status: 200, order: result, msg: 'Order is created!'})
        });

        // Log out
        socket.on('logout',()=>{
            if(!socket.nickname) return;
            delete users[socket.nickname];
        });

        socket.on('disconnect', () => {
            connections.splice(connections.indexOf(socket),1)
            console.log('Disconnected:%s sockets connected',connections.length)
            console.log('user disconnected');
        });
    });

};
