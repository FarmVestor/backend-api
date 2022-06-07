var models = require('../models');
var authService = require('../services/auth');
var models = require('../models');
var authService = require('../services/auth');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


var { farmTransformer, farmsTransformers } = require('../Transformaers/farmTransformers');

exports.index = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    const order = req.query.order || 'ASC' 
   
    
    const filter=req.query.filter ? JSON.parse(req.query.filter) : {cityId:0,farmKindId:0,cropId:0,lastCropId:0,farmAvailable:"string"}
    console.log("filter  ", typeof filter?.farmAvailable)
    
   console.log(order +"-------")
    const farm = await models.Farms.findAll({
        order: [
            ['farmName', order]
        ],
        include: [{
            model: models.Users
        },
        {
            model: models.Crops,
            as: "Crop"
        },
        {
            model: models.Crops,
            as: "LastCrop"
        },
        {
            model: models.FarmKinds
        },
        {
            model: models.Deal
        },
        {
            model: models.Cities
        }
        ],
        
        where:{
            cityId:filter.cityId==0 ? {[Op.gte]: 1} : filter.cityId,
            cropId:filter.cropId==0 ? {[Op.gte]: 1} : filter.cropId,
            farmLastCropsId:filter.lastCropId==0 ? {[Op.gte]: 1} : filter.lastCropId,
            farmKindId:filter.farmKindId==0 ? {[Op.gte]: 1} : filter.farmKindId,
            // farmAvailable:(typeof filter.farmAvailable == 'Boolean') ? filter.farmAvailable : {[Op.or]:[{farmAvailable: {[Op.eq]: "true"} }, { farmAvailable: {[Op.eq]: "false"}}]}
            deleted: req.query.deleted == 1 ? 1 : 0,
            userId:req.query.userId ? req.query.userId : {[Op.gte]: 1}

            
        }

    })
       
            if (Array.isArray(farm)) {
                // console.log(farm)
                response.data =farmsTransformers(farm)
                // console.log("farmmmm",farm)
                response.success = true
                res.send(response)
            }
        // }).finally(() => {
        //     res.send(response)
       
}

exports.store = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    if (!req.body?.userId) {
        response.messages.push("Please add a userId")
        response.success = false
    }
    
    if (!req.body?.farmName) {
        response.messages.push("Please add afarm name")
        response.success = false
    }
    if (req.body?.city) {
        response.messages.push("please add a city")
        response.success = false
    }
    
    if (!req.body?.farmArea) {
        response.messages.push("Please add a farm area")
        response.success = false
    }
    if (!req.body?.cropId) {
        response.messages.push("Please add a crop")
        response.success = false
    }
    if (!req.body?.farmAvailable) {
        response.messages.push("Please select a farm avalibility")
        response.success = false
    }
    if (!req.body?.farmKindId) {
        response.messages.push("Please add a farm kind")
        response.success = false
    }
    if (!req.body?.farmVisibiltiy) {
        response.messages.push("Please select a farm visibility")
        response.success = false
    }
    if (!req.body?.farmWaterSalinity) {
        response.messages.push("Please add a farm Water Salinity")
        response.success = false
    }
    if (!req.body?.farmLastCropsId) {
        response.messages.push("Please add a farm Last Crop")
        response.success = false
    }
    if (!req.body?.farmFertilizer) {
        response.messages.push("Please add a farmFertilizer")
        response.success = false
    }
    if (!req.body?.farmTreesAge) {
        response.messages.push("Please add a farm Trees Age")
        response.success = false
    }
    if (!req.body?.farmDescription) {
        response.messages.push("Please add a farm Description")
        response.success = false
    }
    if (!req.body?.farmLicense) {
        response.messages.push("Please add a farm License")
        response.success = false
    }
    if (!req.body?.farmLongitude) {
        response.messages.push("Please add Longitude.")
        response.success = false
    }
    if (!req.body?.farmLatitude) {
        response.messages.push("Please add Latitude.")
        response.success = false
    }
    if (!req.file) {
        response.messages.push('Please add a photo')
        response.success = false
        res.send(response)
        return
    }

    if (response.success === true) {
        await models.Farms.create({
            userId: req.body.userId,
            farmName: req.body.farmName,
            farmPicture: req.file.filename,
            cityId: req.body.cityId,
            farmArea: req.body.farmArea,
            cropId: req.body.cropId,
            farmAvailable: req.body.farmAvailable,
            farmKindId: req.body.farmKindId,
            farmVisibiltiy: req.body.farmVisibility,
            farmWaterSalinity: req.body.farmWaterSalinity,
            farmLastCropsId: req.body.farmLastCropsId,
            farmFertilizer: req.body.farmFertilizer,
            farmTreesAge: req.body.farmTreesAge,
            farmDescription: req.body.farmDescription,
            farmLicense: req.body.farmLicense,
            farmLongitude: req.body.farmLongitude,
            farmLatitude: req.body.farmLatitude

        }).then(newfarm => {
            response.messages.push("Farms Added Successfully")
            response.data = newfarm
        })
    }
    res.send(response)
}

exports.show = async function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
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
            as: "Crop"
        },
        {
            model: models.Crops,
            as: "LastCrop"
        },
        {
            model: models.FarmKinds
        },
        {
            model: models.Deal
        },
        {
            model: models.Cities
        }
        ],
    })
    if (farm) {
        response.success = true;
        response.data = farmTransformer(farm)
    } else {
        response.messages.push("farm not found")
        res.status(404)
    }
    res.send(response)
}

exports.update = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
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
        if (req.body.farmAvailable) {
            farm.farmAvailable = req.body.farmAvailable
        }
        if (req.body.fatmKindId) {
            farm.fatmKindId = req.body.farmKindId
        }
        if (req.body.farmVisibiltiy) {
            farm.farmVisibiltiy = req.body.farmVisibility
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
        if (req.body.farmLatitude) {
            farm.farmLatitude = req.body.farmLatitude
        }
        if (req.body.farmLongitude) {
            farm.farmLongitude = req.body.farmLongitude
        }
        if (req.file) {
            fs.unlink('uploads/' + farm.farmPicture, () => { })
            farm.farmPicture = req.file.filename
            //console.log(req.file)
        }
        farm.save().then((farm) => {
            response.data = farmTransformer(farm)
            response.messages.push("farm has been updated")
            response.success = true
            res.send(response)
        })

    } else {
        response.messages.push("not found")
        res.send(response)
    }

}

exports.delete = async function (req, res) {
    let response = {
        messages: [],
        success: true,
        data: {}
    }
    const id = req.params.id
    // const deleted = req.query.deleted ? 1 : 0
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }

    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.Farms.findByPk(id)
    if (updated) {
        if (req.query.deleted==1) {
            updated.deleted = 1
            console.log(" -------------- if req.query.deleted",req.query.deleted)

        } else {
            updated.deleted = 0
            console.log(" 000000000000 else req.query.deleted",req.query.deleted)

        }
        updated.save().then((deal) => {
            response.messages.push('Done Successfully')
            
            response.success = true
            response.data = deal
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem with the farm Id')
        response.success = false
        res.send(response)
    }
}

//FarmKinds Controllers/////

exports.FarmKindsindex = async function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }


    const farmKinds = await models.FarmKinds.findAll({
        include: [{
            model: models.Requests,
            model: models.Farms
        }],

    })
            if (Array.isArray(farmKinds)) {
                response.data = farmKinds
                // console.log("farmmmm",farmKinds)
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
exports.FarmKindsshow = async function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    const Kind = await models.FarmKinds.findByPk(id, {
        include: [
            { model: models.Requests },
            { model: models.Farms }
        ]
    })
    if (Kind) {
        response.success = true;
        response.data = Kind
    } else {
        response.messages.push("kind not found")
        res.status(404)
    }
    res.send(response)
}
exports.FarmKindsupdate = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    const id = req.params.id
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
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
                response.messages.push("kind has been updated")
                response.success = true
                res.send(response)
            })
        }
        else {
            response.messages.push("You have to add a data to update")
            res.send(response)
        }

    }
    else {
        response.messages.push("not found")
        res.send(response)
    }

}
exports.FarmKindsdelete = async function (req, res) {
    let response = {
        messages: [],
        success: true,
        data: {}
    }
    const id = req.params.id
    // const deleted = req.query.deleted ? 1 : 0
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }


    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.FarmKinds.findByPk(id)
    if (updated) {
        if (req.query.deleted) {
            updated.deleted = 1
        } else {
            updated.deleted = 0
        }
        updated.save().then((deal) => {
            response.messages.push('Done Successfully')
            response.success = true
            response.data = deal
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem with the farmKind Id')
        response.success = false
        res.send(response)
    }
}

//the crops controllers
exports.cropsIndex = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    models.Crops.findAll({
        include: [

            { model: models.Requests },
            {
                model: models.Farms,
                as: "Crop"
            },
            {
                model:models.Farms,
                as:"LastCrop"
            }


        ]

    })
        .then(crops => {
            if (Array.isArray(crops)) {
                response.data = crops
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })

}
exports.cropsStore = async function (req, res, next) {
    var response = {
        success: true,
        messages: []
    }

    
 console.log(req)
    if (!req.body?.cropName) {
        response.messages.push("Please add a cropName")
        response.success = false }
   
    if (response.success === true) {
        await models.Crops.create({
            cropId: req.body.cropId,
            cropName: req.body.cropName,

        }).then(newCrop => {
            response.data = newCrop
            response.messages.push('Crop Added Successfuly')
        })
    }
    res.send(response)
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
    const crop = await models.Crops.findByPk(id, {
        include: [
            {
                model: models.Requests,

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
    if (!req.body?.cropName) {
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
        success: true,
        data: {}
    }
    const id = req.params.id
    // const deleted = req.query.deleted ? 1 : 0
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }


    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.Deal.findByPk(id)
    if (updated) {
        if (req.query.deleted) {
            updated.deleted = 1
        } else {
            updated.deleted = 0
        }
        updated.save().then((deal) => {
            response.messages.push('Done Successfully')
            response.success = true
            response.data = deal
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem with the Crop Id')
        response.success = false
        res.send(response)
    }
}












