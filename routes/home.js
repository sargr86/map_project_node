const router = express.Router();
const homeController = require('../controllers/homeController');
const ferriesController = require('../controllers/ferriesController');

router.get('/get_places', ferriesController.get);


module.exports = router;