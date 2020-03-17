const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validateOrder = require('../validators/validateOrder');

router.post('/create',validateOrder.rules, ordersController.createFromReq);
router.get('/get', ordersController.getAll);


module.exports = router;
