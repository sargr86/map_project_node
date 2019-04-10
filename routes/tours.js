const router = express.Router();
const toursController = require('../controllers/toursController');

router.get('/get', toursController.get);

module.exports = router;