var models = require('../models');
var authService = require('../services/auth');

exports.index = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    } 
    const order = req.query.order||"ASC"
    const userId = req.query.id
   
    let wher = {}
    if (userId) {
        wher = {
            id:userId
        }
    } else {
        wher = {
            id: {
                [Op.gte]: 1
            }
        }
    }
    models.Deal.findAll({
        order: [
            ["id", order]
        ],
        include: [
           {
            model:models.Farms,
            include:[
                {model:models.Users,
                    where:wher
                },
                
            ]   
           },
           {
            model:models.Users,
            as:'agent'
           },
           {
            model:models.Users,
            as:'investor'
           }
        ],
        
        
       
    })
        .then(deals => {
            if (Array.isArray(deals)) {
                response.data = deals
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}

exports.store = async function (req, res, next) {
    var response = {
        success: true,
        messages: []
    }
   
    console.log(req)

    if (!req.body?.farmId) {
        response.messages.push("Please add a userId")
        response.success = false
    }
    
    if (!req.body?.agentId && !req.body?.investorId) {
        response.messages.push("Please add either agent id or investor id")
        response.success = false
    }
    if (req.body?.agentId && req.body?.investorId) {
        response.messages.push("Agent Id and Investor Id can't be both exist at the same time ")
        response.success = false
    }
    
    if (!req.body?.dealPrice) {
        response.messages.push("Please add a dealPrice")
        response.success = false
    }
    if (!req.body?.dealStatus) {
        response.messages.push("Please add a dealStatus")
        response.success = false
    }
    

    if (response.success === true) {
        await models.Deal.create({
            farmId:req.body.farmId,
            agentId: req.body.agentId,
            investorId: req.body.investorId,
            dealPrice: req.body.dealPrice,
            dealStatus: req.body.dealStatus,

        }).then(newDeal => {
            response.data = newDeal
            response.messages.push('Deal Added Successfuly')

        })
    }
    res.send(response)

}

exports.show = async function (req, res, next) {
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
    const deal = await models.Deal.findByPk(id,{
        include: [
            {
             model:models.Farms,
             include:[models.Users]   
            },
            {
             model:models.Users,
             as:'agent'
            },
            {
             model:models.Users,
             as:'investor'
            }
         ]
    })
    if (deal) {
        response.success = true;
        response.data = deal
    } else {
        response.messages.push("deal not found")
        res.status(404)
    }
    res.send(response)
}

exports.update = async function (req, res, next) {
    let response = {
        messages: [],
        success: true,
        data: {}
    }
    const id = req.params.id
    console.log("req.body.agentId",req.body.agentId,req.body.investorId)
    console.log(typeof id)
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
        
    }
    if (!req.body?.agentId && !req.body?.investorId) {
        response.messages.push("Please add either agent id or investor id")
        response.success = false
        res.send(response)
        return
    }
    if (req.body?.agentId && req.body?.investorId) {
        response.messages.push("Agent Id and Investor Id can't be both exist at the same time ")
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
        if (req.body.agentId) {
            updated.agentId = req.body.agentId
        }
        if (req.body.investorId) {
            updated.investorId = req.body.investorId
        }
        if (req.body.dealPrice) {
            updated.dealPrice = req.body.dealPrice
        }
        if (req.body.dealStatus) {
            updated.dealStatus = req.body.dealStatus
        }
        
        updated.save().then((deal) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = deal
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem updating the user.  Please check the user information.')
        response.success = false
        res.send(response)
    }
    
}

exports.delete = async function (req, res, next) {
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
    const deleted = await models.Deal.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("User has been deleted")
        response.success = true
    } else {
        response.messages.push("User has not been deleted")
    }
    res.send(response)
}