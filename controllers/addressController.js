var models = require('../models');
var authService = require('../services/auth');

//country controllers



















































































































































//Governrates controllers  
exports.governrateIndex = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    models.Governrates.findAll({
        include: [
            {model:models.Countries},
            {model:models.Cities}
        ]
       
         })
        .then(governrate => {
            if (Array.isArray(governrate)) {
                response.data = governrate
                response.success = true
            } else {
                response.message.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
}
exports.governrateStore = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    const governrateName = req.body.governrateName
    const countryId = req.body.countryId


    if (!governrateName) {
        response.messages.push('Please add a valid governrate Name')
        response.success = false
    }

    if (!countryId) {
        response.messages.push('Please add an countryI d')
        response.success = false
        res.send(response)
        return
        
    }

    if (response.success === true) {
        await models.Governrates.create({
            governrateName: req.body.governrateName,
            countryId: req.body.countryId

        }).then(newGovernrate => {

            response.messages.push('governrate added')
            response.data = newGovernrate
        })
    }
    res.send(response)
}
exports.governrateShow = async function (req, res) 
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
    const governrate = await models.Governrates.findByPk(id, {
        include: [
            {model:models.Countries},
            {model:models.Cities}
        ]
    })
    if (governrate) {
        response.success = true;
        response.data = governrate
    } else {
        response.message.push("governrate not found")
        res.status(404)
    }
    res.send(response)
}
exports.governrateUpdate = async function (req, res) {
        
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
    if (!req.body?.governrateName?.length) {
        response.message.push("Please add a farm governrate Name")
        response.success = false
    }
    if (!req.body?.countryId?.length) {
        response.message.push("Please add a country Id ")
        response.success = false
    }
    
    if (!response.success) {
        res.send(response)
        return
    }

    const governrate = await models.Governrates.findByPk(id)
    if (governrate) {
        if (req.body.governrateName) {
            governrate.governrateName = req.body.governrateName
        }
        if (req.body.countryId) {
            governrate.countryId = req.body.countryId
        }
       
        governrate.save().then((governrate) => {
            response.data = governrate
            response.message.push("governrate has been updated")
            response.success = true
            res.send(response)
        })
        
    } else {
        response.message.push("not found")
        res.send(response)
    }
    
}
exports.governrateDelete = async function (req, res) {
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
    const deleted = await models.Governrates.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.message.push("governrate has been deleted")
        response.success = true
    } else {
        response.message.push("governrate has not been deleted")
    }
    res.send(response)
}






