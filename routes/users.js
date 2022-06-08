var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isDifferentAdmin } = require('../middlewares/isDifferentAdmin');

router.get('/',isAuthenticated,userController.index);
router.post('/', userController.signup);
router.post('/login', userController.login);
<<<<<<< HEAD
router.get('/admin/:id', isAuthenticated,userController.show);
=======
router.get('/admin/:id', userController.show);
>>>>>>> 02bdfb3597ce6e017bacd3cce8803bcc53944515
router.put('/admin/:id', isAuthenticated, userController.update);
router.get('/profile', isAuthenticated, userController.profile);
router.delete('/:id', isAuthenticated, isDifferentAdmin, userController.delete);


// userType routes
router.get('/userType/all',userController.indexUserType);
router.get('/userType/:id',isAuthenticated,userController.showUserType);
router.post('/userType', isAuthenticated,userController.storeUserType);
router.put('/userType/:id', isAuthenticated, userController.updateUSerType);
router.delete('/userType/:id', isAuthenticated, isDifferentAdmin, userController.deleteUserType);
module.exports = router;