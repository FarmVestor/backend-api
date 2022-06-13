var express = require('express');
var router = express.Router();
var farmController = require('../controllers/farmController')
var cropsControllers = require('../controllers/farmController')
var path = require('path');
const multer = require('multer')
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('FILEEEEEEEEEEEEEEEEEEEEEEEE',file)
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const acceptFile = function (req, file, cb) {
  const acceptedMimType = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/jfif',
  ]
  if (acceptedMimType.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  fileFilter: acceptFile,
  limits: { fileSize: 104857600 }
})

// const multipleUpload = multer({storage: storage})

router.get('/', isAuthenticated, farmController.index);
router.get('/all', farmController.index);
router.post('/', isAuthenticated, upload.single('farmPicture', 12), farmController.store);
router.get('/:id', farmController.show);
router.put('/:id', isAuthenticated, upload.single('farmPicture', 12), farmController.update);
router.delete('/:id', isAuthenticated, farmController.delete);

//the farm/farmKinds routes 
router.get('/farmKinds/all', farmController.FarmKindsindex);
router.post('/farmKinds', isAdmin, farmController.FarmKindsstore);
router.get('/farmKinds/:id', farmController.FarmKindsshow);
router.put('/farmKinds/:id', isAdmin, farmController.FarmKindsupdate);
router.delete('/farmKinds/:id', isAdmin, farmController.FarmKindsdelete);

//the farm/crops routes 
router.get('/crops/all', cropsControllers.cropsIndex);
router.post('/crops', isAdmin, cropsControllers.cropsStore);
router.get('/crops/:id', cropsControllers.cropsShow);
router.put('/crops/:id', isAdmin, cropsControllers.cropsUpdate);
router.delete('/crops/:id', isAdmin, cropsControllers.cropsDelete);

module.exports = router;