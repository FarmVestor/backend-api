var express = require('express');
var router = express.Router();
var contactsController = require('../controllers/contactsController');
const { isAdmin } = require('../middlewares/isAdmin');

router.post('/', isAdmin, contactsController.contacts);

module.exports = router;