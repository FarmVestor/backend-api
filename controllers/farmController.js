var models = require('../models');
var authService = require('../services/auth');
var models = require('../models');
var authService = require('../services/auth');
const fs = require('fs')
const sequelize = require('sequelize')

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
            model: models.Crops
        },
        {
            model: models.FarmKinds
        }
        ],

    })
       
            if (Array.isArray(farm)) {
                response.data = farm
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
            farmAvialable: req.body.farmAvialable,
            fatmKindId: req.body.fatmKindId,
            farmVisibiltiy: req.body.farmVisibiltiy,
            farmWaterSalinity: req.body.farmWaterSalinity,
            farmLastCropsId: req.body.farmLastCropsId,
            farmFertilizer: req.body.farmFertilizer,
            farmTreesAge: req.body.farmTreesAge,
            farmDescription: req.body.farmDescription,
            farmLicense: req.body.farmLicense,
        }).then(newfarm => {
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
            model: models.Crops
        },
        {
            model: models.FarmKinds
        }
        ],
    })
    if (farm) {
        response.success = true;
        response.data = farm
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
            response.data = farm
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