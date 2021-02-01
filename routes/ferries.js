const router = express.Router();
const ferriesController = require('../controllers/ferriesController');
const validateFerry = require('../validators/validateFerry');
const validateRoute = require('../validators/validateRoute');

router.get('/get', ferriesController.get);
router.get('/get-partners', ferriesController.getPartners);

router.get('/getOne', ferriesController.getOne);
router.post('/add', checkAuth, checkRole('admin', 'partner'), uploadImages, validateFerry.rules, ferriesController.add);
router.put('/update', checkAuth, checkRole('admin', 'partner'), uploadImages, validateFerry.rules, ferriesController.update);
router.put('/make-cover', checkAuth, checkRole('admin', 'partner'), ferriesController.makeCover);
router.put('/assign-driver', checkAuth, checkRole('admin', 'partner'), ferriesController.assignDriver);
router.delete('/remove', checkAuth, checkRole('admin', 'partner'), ferriesController.remove);
router.delete('/remove-image', checkAuth, checkRole('admin', 'partner'), ferriesController.removeImage);
// router.delete('/remove-image', ferriesController.removeImage);

router.get('/get_real_locations', ferriesController.getRealLocations);
router.post('/add-location', ferriesController.addLocation);
router.put('/update-location', ferriesController.updateLocation);
router.delete('/remove-location', ferriesController.removeLocation);
router.get('/get-directions', ferriesController.getFerriesDirections);
router.get('/get-directions-pricing', ferriesController.getFerriesDirectionsPrices);
router.get('/get-direction-price', ferriesController.getFerryDirectionPrice);
// router.post('/import-routes-file', ferriesController.importJSONFile);
// router.post('/get-route-price', ferriesController.getRoutePrice);
router.put('/update-route-price', validateRoute.rules, ferriesController.updateRoutePrice);
router.delete('/remove-route-price', ferriesController.removeRoutePrice);
router.delete('/remove-all-routes-prices', ferriesController.removeAllRoutesPrices);

// Mongo version
// router.post('/import-prices-file', ferriesController.importPricesFile);
// router.get('/get-all-routes-prices', ferriesController.getAllRoutesPrices);
// router.post('/save-route-price', validateRoute.rules, ferriesController.addRoutePrice);



// MySQL version
router.get('/get-all-routes', ferriesController.getFerriesDirectionsPrices);
router.post('/get-route-price', ferriesController.getFerriesDirectionsPrices);
router.get('/get-all-routes-prices', ferriesController.getFerriesDirectionsPrices);
router.post('/import-routes-file', ferriesController.importJSONFile);
router.post('/save-route-price', validateRoute.rules, ferriesController.addRoutePrice);
router.post('/import-prices-file', ferriesController.importPricesFile);

module.exports = router;
