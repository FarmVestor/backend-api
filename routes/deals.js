var express = require('express');
var router = express.Router();
var dealController = require('../controllers/dealControllers')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/', isAuthenticated,dealController.index);
router.post('/', isAuthenticated,dealController.store);
router.get('/:id', isAuthenticated, dealController.show);
router.put('/:id', isAuthenticated, dealController.update);
router.delete('/:id', isAuthenticated, isDifferentAdmin, dealController.delete);

module.exports = router;