const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validateActivity = require('../validators/validateActivity');

router.get('/get', activitiesController.get);
router.get('/get-partners', activitiesController.getPartners);
router.get('/getOne', activitiesController.getOne);
router.post('/add', uploadTourImg, validateActivity.rules, activitiesController.add);
router.put('/update', uploadTourImg, validateActivity.rules, activitiesController.update);
router.delete('/remove', activitiesController.remove);

module.exports = router;
