var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/', userController.index);
router.post('/', isAuthenticated, userController.signup);
router.post('/login', userController.login);
// router.get('/:id', isAuthenticated, userController.show);
// router.put('/:id', isAuthenticated, userController.update);
// router.delete('/:id', isAuthenticated, isDifferentAdmin, userController.delete);

module.exports = router;