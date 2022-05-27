var models = require('../models');
var authService = require('../services/auth');

//country controllers

exports.countryIndex = function (req, res) {
    var response = {
        success: false,
        messages: [],
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
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}
exports.countryStore = async function (req, res, next) {
    var response = {
        success: true,
        messages: []
    }
   
    console.log(req)

    if (!req.body?.countryName) {
        response.messages.push("Please add a country Name")
        response.success = false
    }
    if (!response.success) {
        res.send(response)
        return
    }
    if (response.success === true) {
        await models.Countries.create({
            countryName: req.body.countryName,
        }).then(newCountry => {
            response.data = newCountry
            response.messages.push('Country Added Successfuly')

        })
    }
    res.send(response)

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
    const country = await models.Countries.findByPk(id,{
        include: [
            {
             model:models.Governrates,
            }
         ]
    })
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
    if (!req.body?.countryName) {
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
        response.messages.push('There was a problem updating the country.  Please check the country information.')
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

//Governrates controllers  
exports.governrateIndex = function (req, res) {
    var response = {
        success: false,
        messages: [],
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
                response.messages.push("hi")
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
        response.messages.push("governrate not found")
        res.status(404)
    }
    res.send(response)
}
exports.governrateUpdate = async function (req, res) {
        
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
    if (!req.body?.governrateName) {
        response.messages.push("Please add a farm governrate Name")
        response.success = false
    }
    if (!req.body?.countryId) {
        response.messages.push("Please add a country Id ")
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
            response.messages.push("governrate has been updated")
            response.success = true
            res.send(response)
        })
        
    } else {
        response.messages.push("not found")
        res.send(response)
    }
    
}
exports.governrateDelete = async function (req, res) {
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
    const deleted = await models.Governrates.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("governrate has been deleted")
        response.success = true
    } else {
        response.messages.push("governrate has not been deleted")
    }
    res.send(response)
}

//city controllers start
exports.cityIndex = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    } 
    models.Cities.findAll({
        include: [
           {
            model:models.Users,
           },
           {
            model:models.Farms,
           }
        ]
       
    })
        .then(cities => {
            if (Array.isArray(cities)) {
                response.data = cities
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
   
}
exports.cityStore = async function (req, res, next) {
    var response = {
        success: true,
        messages: []
    }
   
    console.log(req)

    if (!req.body?.cityName) {
        response.messages.push("Please add a city Name")
        response.success = false
    }
    if (!req.body?.governrateId) {
        response.messages.push("Please add a governrateId")
        response.success = false
    }
    if (!req.body?.latitude) {
        response.messages.push("Please add a latitude")
        response.success = false
    }
    if (!req.body?.longitude) {
        response.messages.push("Please add a longitude")
        response.success = false
    }
    

    if (response.success === true) {
        await models.Cities.create({
            cityName: req.body.cityName,
            governrateId: req.body.governrateId,
            latitude: req.body.latitude,
            longitude: req.body.longitude,

        }).then(newCity => {
            response.data = newCity
            response.messages.push('City Added Successfuly')

        })
    }
    res.send(response)

}
exports.cityShow = async function (req, res, next) {
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
    const city = await models.Cities.findByPk(id,{
        include: [
            {
             model:models.Users,
            },
            {
             model:models.Farms,
            }
         ]
    })
    if (city) {
        response.success = true;
        response.data = city
    } else {
        response.messages.push("city not found")
        res.status(404)
    }
    res.send(response)
}
exports.cityUpdate = async function (req, res, next) {
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
    if (!req.body?.cityName) {
        response.messages.push("Please add a city Name")
        response.success = false
    }
    if (!req.body?.governrateId) {
        response.messages.push("Please add a governrateId")
        response.success = false
    }
    if (!req.body?.latitude) {
        response.messages.push("Please add a latitude")
        response.success = false
    }
    if (!req.body?.longitude) {
        response.messages.push("Please add a longitude")
        response.success = false
    }
    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.Cities.findByPk(id)
    if (updated) {
        if (req.body.cityName) {
            updated.cityName = req.body.cityName
        }
        if (req.body.governrateId) {
            updated.governrateId = req.body.governrateId
        }
        if (req.body.latitude) {
            updated.latitude = req.body.latitude
        }
        if (req.body.longitude) {
            updated.longitude = req.body.longitude
        }
        
        updated.save().then((city) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = city
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem updating the city.  Please check the city information.')
        response.success = false
        res.send(response)
    }
    
}
exports.cityDelete = async function (req, res, next) {
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
    const deleted = await models.Cities.destroy({
        where: {
            id: id
        }
    })
    if (deleted == 1) {
        response.messages.push("City has been deleted")
        response.success = true
    } else {
        response.messages.push("City not found")
    }
    res.send(response)
}