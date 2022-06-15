var express = require('express');
var router = express.Router();
var addressController = require('../controllers/addressController');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

// country routes 
router.get('/country', addressController.countryIndex);
router.post('/country', isAdmin,addressController.countryStore);
router.get('/country/:id', addressController.countryShow);
router.put('/country/:id', isAdmin, addressController.countryUpdate);
router.delete('/country/:id', isAdmin, addressController.countryDelete);

//governrate routes
router.get('/governrate', addressController.governrateIndex);
router.post('/governrate', isAdmin,addressController.governrateStore);
router.get('/governrate/:id', addressController.governrateShow);
router.put('/governrate/:id', isAdmin, addressController.governrateUpdate);
router.delete('/governrate/:id', isAdmin, addressController.governrateDelete);

//city routes
router.get('/city', addressController.cityIndex);
router.post('/city', isAdmin,addressController.cityStore);
router.get('/city/:id', addressController.cityShow);
router.put('/city/:id', isAdmin, addressController.cityUpdate);
router.delete('/city/:id', isAdmin, addressController.cityDelete);

module.exports = router;