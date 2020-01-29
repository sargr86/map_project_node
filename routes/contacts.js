const router = express.Router();
const contactsController = require('../controllers/contactsController');
const validateActivity = require('../validators/validateActivity');

// router.get('/get', activitiesController.get);
// router.get('/get-partners', activitiesController.getPartners);
// router.get('/getOne', activitiesController.getOne);
router.post('/request', contactsController.request);
// router.put('/update', uploadTourImg, validateActivity.rules, activitiesController.update);
// router.delete('/remove', activitiesController.remove);

module.exports = router;
