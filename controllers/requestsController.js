const { request } = require('../app');
var models = require('../models');
var authService = require('../services/auth');

exports.index = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    const order = req.query.order 

    models.Requests.findAll({
        order: [
            ["id", order]
        ],
        include: [
            {model: models.Crops},
            {model: models.FarmKinds},
            {model: models.Users}
            
        ]

    })
        .then(request => {
            if (Array.isArray(request)) {
                response.data = request
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
}
exports.store = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    const farmKindId = req.body.farmKindId
    const farmArea = req.body.farmArea
    const budget = req.body.budget
    const cropId = req.body.cropId
    const userId = req.body.userId


    if (!farmKindId) {
        response.messages.push('Please add a valid farm Kind Id')
        response.success = false
        
    }

    if (!farmArea) {
        response.messages.push('Please add a farm Area')
        response.success = false
        res.send(response)
        

    }
    if (!budget) {
        response.messages.push('Please add a farm budget')
        response.success = false
        res.send(response)
        

    }
    if (!cropId) {
        response.messages.push('Please add a farm cropId')
        response.success = false
        res.send(response)
          
    }
    if (!userId) {
        response.messages.push('Please add a farm userId')
        response.success = false
        res.send(response)
        return
    }


    if (response.success === true) {
        await models.Requests.create({
            farmKindId: req.body.farmKindId,
            farmArea: req.body.farmArea,
            budget: req.body.budget,
            cropId: req.body.cropId,
            userId: req.body.userId



        }).then(newReuest => {

            response.messages.push('Reuest added')
            response.data = newReuest
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
    const request = await models.Requests.findByPk(id, {
        include: [
            {
                model: models.Crops,
                model: models.FarmKinds,
                model: models.Users
            }
        ]
    })
    if (request) {
        response.success = true;
        response.data = request
    } else {
        response.messages.push("request not found")
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
    // if (!req.body?.farmKindId) {
    //     response.messages.push("Please add a farm Kind ID")
    //     response.success = false
    // }
    // if (!req.body?.farmArea) {
    //     response.messages.push("Please add a farm Area ")
    //     response.success = false
    // }
    // if (!req.body?.budget) {
    //     response.messages.push("Please add a budget")
    //     response.success = false
    // }
    // if (!req.body?.cropId) {
    //     response.messages.push("Please add a cropId")
    //     response.success = false
    // }
    // if (!req.body?.userId) {
    //     response.messages.push('Please add an farm userId')
    //     response.success = false
    //     res.send(response)
    //     return
    // }

    // if (!response.success) {
    //     res.send(response)
    //     return
    // }

    const request = await models.Requests.findByPk(id)
    if (request) {
        if (req.body.farmKindId) {
            request.farmKindId = req.body.farmKindId
        }
        if (req.body.farmArea) {
            request.farmArea = req.body.farmArea
        }
        if (req.body.budget) {
            request.budget = req.body.budget
        }
        if (req.body.cropId) {
            request.cropId = req.body.cropId
        }
        if (req.body.userId) {
            request.userId = req.body.userId
        }
        request.save().then((request) => {
            response.data = request
            response.messages.push("request has been updated")
            response.success = true
            res.send(response)
        })

    } else {
        response.messages.push("not found")
        res.send(response)
    }

}
exports.delete = async function (req, res) {
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
    const deleted = await models.Requests.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("request has been deleted")
        response.success = true
    } else {
        response.messages.push("request has not been deleted")
    }
    res.send(response)
}