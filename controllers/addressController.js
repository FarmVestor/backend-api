var models = require('../models');
var authService = require('../services/auth');

//country controllers

exports.countryIndex = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    } 
    models.Countries.findAll({
        include: [
           {
            model:models.Governrates,
           }
        ]
       
    })
        .then(countries => {
            if (Array.isArray(countries)) {
                response.data = countries
                response.success = true
            } else {
                response.message.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}
exports.countryStore = async function (req, res, next) {
    var responce = {
        success: true,
        message: []
    }
   
    console.log(req)

    if (!req.body?.countryName?.length) {
        responce.message.push("Please add a country Name")
        responce.success = false
    }
    if (!responce.success) {
        res.send(responce)
        return
    }
    if (responce.success === true) {
        await models.Countries.create({
            countryName: req.body.countryName,
        }).then(newCountry => {
            responce.data = newCountry
            responce.message.push('Country Added Successfuly')

        })
    }
    res.send(responce)

}
exports.countryShow = async function (req, res, next) {
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
    const country = await models.Countries.findByPk(id)
    if (country) {
        response.success = true;
        response.data = country
    } else {
        response.messages.push("country not found")
        res.status(404)
    }
    res.send(response)
}
exports.countryUpdate = async function (req, res, next) {
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
    if (!req.body?.countryName?.length) {
        response.messages.push("Please add a country name")
        response.success = false
    }
    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.Countries.findByPk(id)
    if (updated) {
        if (req.body.countryName) {
            updated.countryName = req.body.countryName
        }
       
        updated.save().then((country) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = country
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem updating the user.  Please check the user information.')
        response.success = false
        res.send(response)
    } 
}
exports.countryDelete = async function (req, res, next) {
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
    const deleted = await models.Countries.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("Country has been deleted")
        response.success = true
    } else {
        response.messages.push("Country not found")
    }
    res.send(response)
}

//country controllers end 

//city controllers starts



