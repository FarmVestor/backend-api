var models = require('../models');
var authService = require('../services/auth');
var models = require('../models');
var authService = require('../services/auth');
const fs = require('fs')
const sequelize = require('sequelize')
var {farmTransformer,farmsTransformers}=require('../Transformaers/farmTransformers')

exports.index = async function (req, res) {
    var response = {
        success: true,
        message: [],
        data: {}
    }


    const farm = await models.Farms.findAll({
        include: [{
            model: models.Users
        },
        {
            model: models.Crops,
            as:"first"
        },
        {
            model: models.Crops,
            as:"second"
        },
        {
            model: models.FarmKinds
        }
        ],

    })
       
            if (Array.isArray(farm)) {
                console.log(farm)
                response.data =farmsTransformers(farm)
                console.log("farmmmm",farm)
                response.success = true
                res.send(response)
            }
        // }).finally(() => {
        //     res.send(response)
       
}

exports.store = async function (req, res) {
    var response = {
        success: true,
        message: [],
        data: {}
    }

    

    // if (!req.body.userId || !req.body.farmName || !req.body.cityId || !req.body.farmArea || !req.body.cropId || !req.body.farmLicense ||
    //     !req.body.farmAvialable || !req.body.farmKindId || !req.body.farmVisibiltiy ||
    //     !req.body.farmWaterSalinity || !req.body.farmLastCropsId || !req.body.farmFertilizer ||
    //     !req.body.farmTreesAge || !req.body.farmDescription    ) {
    //     response.message.push('please fill out all the fields')
    //     response.success = false
    // }
    
    if (!req.file) {
        response.message.push('Please add a photo')
        response.success = false
        res.send(response)
        return
    }

    if (response.success === true) {
        await models.Farms.create({
            userId: req.body.userId,
            farmName: req.body.farmName,
            farmPicture:req.file.filename,
            cityId: req.file.cityId,
            farmArea: req.body.farmArea,
            cropId: req.body.cropId,
            farmAvailable: req.body.farmAvailable,
            farmKindId: req.body.farmKindId,
            farmVisibiltiy: req.body.farmVisibiltiy,
            farmWaterSalinity: req.body.farmWaterSalinity,
            farmLastCropsId: req.body.farmLastCropsId,
            farmFertilizer: req.body.farmFertilizer,
            farmTreesAge: req.body.farmTreesAge,
            farmDescription: req.body.farmDescription,
            farmLicense: req.body.farmLicense,
        }).then(newfarm => {
            response.message.push("Farms Added Successfully")
            response.data = newfarm
        })
    }
    res.send(response)
}

exports.show = async function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.message.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const farm = await models.Farms.findByPk(id, {
        include: [{
            model: models.Users
        },
        {
            model: models.Crops,
            as:"first"
        },
        {
            model: models.Crops,
            as:"second"
        },
        {
            model: models.FarmKinds
        }
        ],
    })
    if (farm) {
        response.success = true;
        response.data =farmTransformer(farm) 
    } else {
        response.message.push("farm not found")
        res.status(404)
    }
    res.send(response)
}

exports.update = async function (req, res) {
    var response = {
        success: true,
        message: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.message.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const farm = await models.Farms.findByPk(id)
    if (farm) {
        if (req.body.farmName) {
            farm.farmName = req.body.farmName
        }
        if (req.body.userId) {
            farm.userId = req.body.userId
        }
        if (req.body.cityId) {
            farm.cityId = req.body.cityId
        }
        if (req.body.farmArea) {
            farm.farmArea = req.body.farmArea
        }
        if (req.body.cropId) {
            farm.cropId = req.body.cropId
        }
        if (req.body.farmAvialable) {
            farm.farmAvialable = req.body.farmAvialable
        }
        if (req.body.fatmKindId) {
            farm.fatmKindId = req.body.fatmKindId
        }
        if (req.body.farmVisibiltiy) {
            farm.farmVisibiltiy = req.body.farmVisibiltiy
        }
        if (req.body.farmWaterSalinity) {
            farm.farmWaterSalinity = req.body.farmWaterSalinity
        }
        if (req.body.farmLastCropsId) {
            farm.farmLastCropsId = req.body.farmLastCropsId
        }
        if (req.body.farmDescription) {
            farm.farmDescription = req.body.farmDescription
        }
        if (req.body.farmTreesAge) {
            farm.farmTreesAge = req.body.farmTreesAge
        }
        if (req.body.farmDescription) {
            farm.farmDescription = req.body.farmDescription
        }
        if (req.body.farmLicense) {
            farm.farmLicense = req.body.farmLicense
        }
        if (req.file) {
            fs.unlink('uploads/' + farm.farmPicture, () => { })
            farm.picture = req.file.filename
        }
        farm.save().then((farm) => {
            response.data =farmTransformer(farm) 
            response.message.push("farm has been updated")
            response.success = true
            res.send(response)
        })
        
    } else {
        response.message.push("not found")
        res.send(response)
    }
    
}

exports.delete = async function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.message.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const deleted = await models.Farms.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.message.push("Place has been deleted")
        response.success = true
    } else {
        response.message.push("Place has not been deleted")
    }
    res.send(response)
}

//FarmKinds Controllers/////

exports.FarmKindsindex = async function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }


    const farmKinds = await models.FarmKinds.findAll({
        include: [{
            model: models.Requests
        },
        {
            model: models.Farms
        },
        ],

    })
            if (Array.isArray(farmKinds)) {
                response.data = farmKinds
                console.log("farmmmm",farmKinds)
                response.success = true
                res.send(response)
            }
    
}

exports.FarmKindsstore = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    const farmKind = req.body.farmKind
  

    if (!farmKind) {
        response.messages.push('Please add a valid farm Kind')
        response.success = false
    }


    if (response.success === true) {
        await models.FarmKinds.create({
            farmKind: req.body.farmKind,
          


        }).then(farmKind => {

            response.messages.push('farm Kind added')
            response.data = farmKind
        })
    }
    res.send(response)
}
exports.FarmKindsshow = async function (req, res) 
    {
        var response = {
            success: false,
            message: [],
            data: {}
        }
        const id = req.params.id
        if (isNaN(id)) {
            response.message.push("Please provide a valid ID")
            response.success = false
            res.send(response)
            return
        }
        const Kind = await models.FarmKinds.findByPk(id, {
            include: [
                {model:models.Requests},
                {model:models.Farms}
            ]
        })
        if (Kind) {
            response.success = true;
            response.data = Kind
        } else {
            response.message.push("kind not found")
            res.status(404)
        }
        res.send(response)
    }
    exports.FarmKindsupdate = async function (req, res) {
        var response = {
            success: true,
            message: [],
            data: {}
        }
        const id = req.params.id
        if (isNaN(id)) {
            response.message.push("Please provide a valid ID")
            response.success = false
            res.send(response)
            return
        }
        const kind = await models.FarmKinds.findByPk(id)
        if (kind) {
            if (req.body.farmKind) {
                kind.farmKind = req.body.farmKind
                 kind.save().then((kind) => {
                response.data = kind
                response.message.push("kind has been updated")
                response.success = true
                res.send(response)
            })}
            else{
                response.message.push("You have to add a data to update")
                res.send(response)
            }
            
        } 
        else {
            response.message.push("not found")
            res.send(response)
        }
        
    }
    exports.FarmKindsdelete = async function (req, res) {
        var response = {
            success: false,
            message: [],
            data: {}
        }
        const id = req.params.id
        if (isNaN(id)) {
            response.message.push("Please provide a valid ID")
            response.success = false
            res.send(response)
            return
        }
        const deleted = await models.FarmKinds.destroy({
            where: {
                id: id
            }
        })
        if (deleted == 1) {
            response.message.push("kind has been deleted")
            response.success = true
        } else {
            response.message.push("kind has not been deleted")
        }
        res.send(response)
    }
    
    //the crops controllers
exports.cropsIndex = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    } 
    models.Crops.findAll({
        include: [
           {
            model:models.Requests,
            
           }
        ]
       
    })
        .then(crops => {
            if (Array.isArray(crops)) {
                response.data = crops
                response.success = true
            } else {
                response.message.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}
exports.cropsStore = async function (req, res, next) {
    var responce = {
        success: true,
        message: []
    }
   
    console.log(req)
    if (!req.body?.cropName?.length) {
        responce.message.push("Please add a cropName")
        responce.success = false
    }
   
    if (responce.success === true) {
        await models.Crops.create({
            cropId: req.body.cropId,
            cropName: req.body.cropName,
         
        }).then(newCrop => {
            responce.data = newCrop
            responce.message.push('Crop Added Successfuly')
        })
    }
    res.send(responce)
}
exports.cropsShow = async function (req, res, next) {
    const id = req.params.id
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const crop = await models.Crops.findByPk(id,{
         include: [
           {
            model:models.Requests,
            
           }
        ]
    })
    if (crop) {
        response.success = true;
        response.data = crop
    } else {
        response.messages.push("crop not found")
        res.status(404)
    }
    res.send(response)
}
exports.cropsUpdate = async function (req, res, next) {
    let response = {
        messages: [],
        success: true,
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    if (!req.body?.cropName?.length) {
        response.messages.push("Please add a Crop")
        response.success = false
        
    }
    if (!response.success) {
        res.send(response)
        return
    }
  
    const updated = await models.Crops.findByPk(id)
    if (updated) {
        if (req.body.cropName) {
            updated.cropName = req.body.cropName
        }
      
        updated.save().then((crop) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = crop
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem updating the user.  Please check the user information.')
        response.success = false
        res.send(response)
    }
    
}
exports.cropsDelete = async function (req, res, next) {
    let response = {
        messages: [],
        success: false,
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const deleted = await models.Crops.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("Crops has been deleted")
        response.success = true
    } else {
        response.messages.push("Crops has not been deleted")
    }
    res.send(response)
}












