var models = require('../models');
var authService = require('../services/auth');

exports.index = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    } 
    models.Deal.findAll({
        include: [
           {
            model:models.Users,
            as:'firstUser'
           },
           {
            model:models.Users,
            as:'secondUser'
           }
        ]
       
    })
        .then(deals => {
            if (Array.isArray(deals)) {
                response.data = deals
                response.success = true
            } else {
                response.message.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}

exports.store = async function (req, res, next) {
    var responce = {
        success: true,
        message: []
    }
   
    console.log(req)

   // const userId = req.body.userId
    // if (userId.length < 3) {
    //     responce.message.push('please add a valid userId')
    //     responce.success = false
    // }
    if (!req.body?.userId?.length) {
        responce.message.push("Please add a userId")
        responce.success = false
    }
    if (!req.body?.partenerId?.length) {
        responce.message.push("Please add a partenerId")
        responce.success = false
    }
    if (!req.body?.dealPrice?.length) {
        responce.message.push("Please add a dealPrice")
        responce.success = false
    }
    if (!req.body?.dealStatus?.length) {
        responce.message.push("Please add a dealStatus")
        responce.success = false
    }
    

    if (responce.success === true) {
        await models.Deal.create({
            userId: req.body.userId,
            partenerId: req.body.partenerId,
            dealPrice: req.body.dealPrice,
            dealStatus: req.body.dealStatus,

        }).then(newDeal => {
            responce.data = newDeal
            responce.message.push('Deal Added Successfuly')

        })
    }
    res.send(responce)

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
    const deal = await models.Deal.findByPk(id)
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
    if (isNaN(id)) {
        response.messages.push("Please provide a valid ID")
        response.success = false
        res.send(response)
        return
    }
    if (!req.body?.userId?.length) {
        response.messages.push("Please add a user ID")
        response.success = false
    }
    if (!req.body?.partenerId?.length) {
        response.messages.push("Please add a Partner ID")
        response.success = false
    }
    if (!req.body?.dealPrice?.length) {
        response.messages.push("Please add a Price")
        response.success = false
    }
    if (!req.body?.dealStatus?.length) {
        response.messages.push("Please add a Deal Status")
        response.success = false
    }
    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.Deal.findByPk(id)
    if (updated) {
        if (req.body.userId) {
            updated.userId = req.body.userId
        }
        if (req.body.partenerId) {
            updated.partenerId = req.body.partenerId
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