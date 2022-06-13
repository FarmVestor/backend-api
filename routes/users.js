var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');
const { isAdmin } = require('../middlewares/isAdmin');


router.get('/all',userController.userIndex);
router.get('/',isAuthenticated,userController.index);
router.post('/', userController.signup);
router.post('/admin/login', userController.adminLogin);
router.post('/login', userController.login);

router.get('/show/:id',userController.show);
router.put('/admin/:id', isAdmin, userController.update);
router.put('/profile', isAuthenticated, userController.updateProfile);
router.get('/profile', isAuthenticated, userController.profile);
router.delete('/:id', isAuthenticated, isDifferentAdmin, userController.delete);


// userType routes
router.get('/admin/userType/all',isAdmin, userController.adminIndexUserType);
router.get('/userType/all', userController.indexUserType);
router.get('/userType/:id',isAdmin,isAuthenticated,userController.showUserType);
router.post('/userType', isAdmin,userController.storeUserType);
router.put('/userType/:id', isAdmin, userController.updateUSerType);
router.delete('/userType/:id', isAdmin, isDifferentAdmin, userController.deleteUserType);
module.exports = router;