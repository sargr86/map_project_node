const router = express.Router();
const ferriesController = require('../controllers/ferriesController');

router.get('/get', ferriesController.get);
router.get('/add', ferriesController.add);

module.exports = router;