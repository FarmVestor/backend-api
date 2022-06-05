var express = require('express');
var router = express.Router();
var dealController = require('../controllers/dealControllers')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/',dealController.index);
router.post('/',dealController.store);
router.get('/:id', dealController.show);
router.put('/:id', dealController.update);
router.delete('/:id', isDifferentAdmin, dealController.delete);

module.exports = router;