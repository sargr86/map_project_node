const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validateOrder = require('../validators/validateOrder');

router.post('/create',validateOrder.rules, ordersController.createFromReq);
router.get('/get', ordersController.getByStatus);
router.put('/change-status', ordersController.changeStatus);
router.get('/get-active-orders', ordersController.getActiveOrders);
router.get('/get-user-orders', ordersController.getUserOrders);


module.exports = router;
