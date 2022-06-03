var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/',userController.index);
router.post('/', userController.signup);
router.post('/login', userController.login);
router.get('/:id', userController.show);
router.put('/:id', isAuthenticated, userController.update);
router.delete('/:id', isAuthenticated, isDifferentAdmin, userController.delete);


// userType routes
router.get('/userType/all',isAuthenticated,userController.indexUserType);
router.get('/userType/:id',isAuthenticated,userController.showUserType);

router.post('/userType', userController.storeUserType);
router.put('/userType/:id', isAuthenticated, userController.updateUSerType);
router.delete('/userType/:id', isAuthenticated, isDifferentAdmin, userController.deleteUserType);
module.exports = router;