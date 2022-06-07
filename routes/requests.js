var express = require('express');
var router = express.Router();
var requestsController = require('../controllers/requestsController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/',isAuthenticated, requestsController.index);
router.post('/',isAuthenticated, requestsController.store);
router.get('/:id', requestsController.show);
router.put('/:id', requestsController.update);
router.delete('/:id', requestsController.delete);

module.exports = router;