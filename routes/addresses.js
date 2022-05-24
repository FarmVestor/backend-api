var express = require('express');
var router = express.Router();
var addressController = require('../controllers/addressController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

// country routes 
router.get('/country', isAuthenticated,addressController.countryIndex);
router.post('/country', isAuthenticated,addressController.countryStore);
router.get('/country/:id', isAuthenticated, addressController.countryShow);
router.put('/country/:id', isAuthenticated, addressController.countryUpdate);
router.delete('/country/:id', isAuthenticated, addressController.countryDelete);

//governrate routes
// router.get('/governrate', isAuthenticated,addressController.governrateIndex);
// router.post('/governrate', isAuthenticated,addressController.governrateStore);
// router.get('/governrate:id', isAuthenticated, addressController.governrateShow);
// router.put('/governrate:id', isAuthenticated, addressController.governrateUpdate);
// router.delete('/governrate:id', isAuthenticated, isDifferentAdmin, addressController.governrateDelete);

//city routes
router.get('/city', isAuthenticated,addressController.cityIndex);
router.post('/city', isAuthenticated,addressController.cityStore);
router.get('/city/:id', isAuthenticated, addressController.cityShow);
router.put('/city/:id', isAuthenticated, addressController.cityUpdate);
router.delete('/city/:id', isAuthenticated, addressController.cityDelete);

module.exports = router;