var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/',isAuthenticated,userController.index);
router.get('/', isAuthenticated,userController.index);
router.post('/', userController.signup);
router.post('/login', userController.login);
router.get('/:id', isAuthenticated, userController.show);
router.put('/:id', isAuthenticated, userController.update);
router.delete('/:id', isAuthenticated, isDifferentAdmin, userController.delete);

module.exports = router;