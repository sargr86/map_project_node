const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validateOrder = require('../validators/validateOrder');

router.post('/create',validateOrder.rules, ordersController.createFromReq);
router.get('/get', ordersController.getByStatus);
router.put('/change-status', ordersController.changeStatus);
router.get('/get-active-orders', ordersController.getUserActiveOrders);
router.get('/get-user-orders', ordersController.getAllUserOrders);
router.get('/get-driver-active-orders', ordersController.getDriverActiveOrders);
router.get('/get-driver-orders', ordersController.getAllDriverOrders);
router.get('/get-counts', ordersController.getAllOrdersCounts);


module.exports = router;
