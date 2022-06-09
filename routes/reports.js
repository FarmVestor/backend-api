var express = require('express');
var router = express.Router();
var reportsController = require('../controllers/reportsController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get('/admin',isAuthenticated, reportsController.index);
// router.post('/',isAuthenticated, requestsController.store);
// router.get('/:id', requestsController.show);
// router.put('/:id', requestsController.update);
// router.delete('/:id', requestsController.delete);

module.exports = router;