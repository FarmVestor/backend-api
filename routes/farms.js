var express = require('express');
var router = express.Router();
var farmController = require('../controllers/farmController')
var cropsControllers = require('../controllers/farmController')
var path = require('path');
const multer  = require('multer')
const { isAuthenticated } = require('../middlewares/isAuthenticated');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  const acceptFile= function(req,file,cb){
      const acceptedMimType=[
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
      ]
      if(acceptedMimType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
  }
  const upload = multer({ storage: storage,
     fileFilter:acceptFile,
    limits:{fileSize:104857600}
    })

router.get('/', farmController.index);
router.post('/',upload.single('farmPicture'), farmController.store);
router.get('/:id', isAuthenticated, farmController.show);
router.put('/:id', isAuthenticated, upload.single('farmPicture'),farmController.update);
router.delete('/:id', isAuthenticated, farmController.delete);

//the farm/farmKinds routes 
router.get('/farmKinds/all',farmController.FarmKindsindex);
router.post('/farmKinds',farmController.FarmKindsstore);
router.get('/farmKinds/:id', isAuthenticated, farmController.FarmKindsshow);
router.put('/farmKinds/:id', isAuthenticated,farmController.FarmKindsupdate);
router.delete('/farmKinds/:id', isAuthenticated, farmController.FarmKindsdelete);

//the farm/crops routes 
router.get('/crops/all',cropsControllers.cropsIndex);
router.post('/crops',cropsControllers.cropsStore);
router.get('/crops/:id',cropsControllers.cropsShow);
router.put('/crops/:id',cropsControllers.cropsUpdate);
router.delete('/crops/:id',cropsControllers.cropsDelete);

module.exports = router;