const router = express.Router();
const contactsController = require('../controllers/contactsController');
const validateActivity = require('../validators/validateActivity');

router.get('/get', contactsController.get);
// router.get('/get-partners', activitiesController.getPartners);
router.get('/get-one', contactsController.getOne);
router.post('/request', contactsController.request);
// router.put('/update', uploadTourImg, validateActivity.rules, activitiesController.update);
router.delete('/remove', contactsController.remove);

module.exports = router;
