const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validateActivity = require('../validators/validateActivity');

router.get('/get', activitiesController.get);
router.get('/get-partners', activitiesController.getPartners);
router.get('/getOne', activitiesController.getOne);
router.post('/add', uploadImages, validateActivity.rules, activitiesController.add);
router.put('/update', uploadImages, validateActivity.rules, activitiesController.update);
router.put('/make-cover', checkAuth, checkRole('admin', 'partner'), activitiesController.makeCover);
router.delete('/remove', activitiesController.remove);
router.delete('/remove-image', activitiesController.removeImage);
module.exports = router;
