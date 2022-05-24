const { request } = require('../app');
var models = require('../models');
var authService = require('../services/auth');

exports.index = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    models.Requests.findAll({
        include: [
            {model:models.Crops},
            {model:models.FarmKinds}
        ]
       
         })
        .then(request => {
            if (Array.isArray(request)) {
                response.data = request
                response.success = true
            } else {
                response.message.push("hi")
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

        if (!farmKindId) {
            response.messages.push('Please add a valid farm Kind Id')
            response.success = false
        }

        if (!farmArea) {
            response.messages.push('Please add an farm Area')
            response.success = false
            res.send(response)
            
        }
        if (!budget) {
            response.messages.push('Please add an farm budget')
            response.success = false
            res.send(response)
            
        }
        if (!cropId) {
            response.messages.push('Please add an farm cropId')
            response.success = false
            res.send(response)
            return
        }
        

        if (response.success === true) {
            await models.Requests.create({
                farmKindId: req.body.farmKindId,
                farmArea: req.body.farmArea,
                budget:req.body.budget,
                cropId:req.body.cropId


            }).then(newReuest => {

                response.messages.push('Reuest added')
                response.data = newReuest
            })
        }
        res.send(response)
}
    exports.show = async function (req, res) 
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
        const request = await models.Requests.findByPk(id, {
            include: [
                {model:models.Crops},
                {model:models.FarmKinds}
            ]
        })
        if (request) {
            response.success = true;
            response.data = request
        } else {
            response.message.push("request not found")
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
        if (!req.body?.farmKindId?.length) {
            response.message.push("Please add a farm Kind ID")
            response.success = false
        }
        if (!req.body?.farmArea?.length) {
            response.message.push("Please add a farm Area ")
            response.success = false
        }
        if (!req.body?.budget?.length) {
            response.message.push("Please add a budget")
            response.success = false
        }
        if (!req.body?.cropId?.length) {
            response.message.push("Please add a cropId")
            response.success = false
        }
        if (!response.success) {
            res.send(response)
            return
        }

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
            request.save().then((request) => {
                response.data = request
                response.message.push("request has been updated")
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
        const deleted = await models.Requests.destroy({
            where: {
                id: id
            }
        })
        if (deleted == 1) {
            response.message.push("request has been deleted")
            response.success = true
        } else {
            response.message.push("request has not been deleted")
        }
        res.send(response)
    }