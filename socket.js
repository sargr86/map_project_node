

const ordersController = require('./controllers/ordersController');
const validateOrder = require('./validators/validateOrder');
exports.socket = (io) => {
    io.on('connection', async (socket) => {
        console.log('connected');
        socket.on('createOrder', async(data)=>{
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


            let result = await ordersController.create(data);
            console.log(result instanceof Error)
            socket.emit('orderCreated',{status:200})
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

};
