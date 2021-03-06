var models = require('../models');
var authService = require('../services/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.index = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    
    const order = req.query.order  == 'ASC' ? 'ASC' : 'DESC'
    let investorId = ''

    if(req.user.userTypeId == 3){
     investorId=req.user.id
    }else{
        investorId= {[Op.gte]: 1}
    }
    console.log("---investorid---",investorId)
    models.Requests.findAll({
        order: [
            ["id", order]
        ],
        include: [
            {model: models.Crops},
            {model: models.FarmKinds},  
            {model: models.Users}
        ],
        where: {
            userId:investorId,
            deleted: req.query.deleted == 1 ? 1 : 0,
            //userId:req.query.id ? req.query.id : {[Op.gte]: 1}

        }

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
    const userId = req.user.id
    
    try{
        if (!farmKindId) {
            response.messages.push('Please add a valid farm Kind Id')
            response.success = false
    
        }
    
        if (!farmArea) {
            response.messages.push('Please add a farm Area')
            response.success = false
          //  res.send(response)
    
    
        }
        if (!budget) {
            response.messages.push('Please add a farm budget')
            response.success = false
          //  res.send(response)
    
    
        }
        if (!cropId) {
            response.messages.push('Please add a farm cropId')
            response.success = false
            
    
        }
        if (!userId) {
            response.messages.push('Please add a farm userId')
            response.success = false
          //  res.send(response)
            
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
        
    }catch (e){
console.error(e)
        res.send("make sure you inserted all fields")

    }

    
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
        response.success = false
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
    const updated = await models.Requests.findByPk(id)
    if (updated) {
        if (req.query.deleted==1) {
            updated.deleted = 1
        } else {
            updated.deleted = 0
        }
        updated.save().then((request) => {
            response.messages.push('Done Successfully')
            response.success = true
            response.data = request
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem with the user Id')
        response.success = false
        res.send(response)
    }

}