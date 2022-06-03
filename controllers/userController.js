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
    const order = req.query.order == 'ASC' ? 'ASC' : 'DESC'
    const id = req.query.id
    console.log(id, "iddddd")
    let wher = {}
    if (id) {
        wher = {
            userTypeId: id
        }
    } else {
        wher = {
            userTypeId: {
                [Op.gte]: 1
            }
        }
    }
    // console.log("wher",wher)
    models.Users.findAll({
        order: [
            ['userName', order]
        ],
        include: [
            { model: models.Cities },
            { model: models.UserType },
            { model: models.Requests },
            { model: models.Farms }

        ],

        where: wher
    })
        .then(users => {
            if (Array.isArray(users)) {
                response.data = users
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
}

exports.signup = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    if (!req.body?.userName) {
        response.messages.push("Please add a name")
        response.success = false
    }
    if (!req.body?.cityId) {
        response.messages.push("Please add a city")
        response.success = false
    }
    if (!req.body?.userPhone) {
        response.messages.push("Please add a phone number")
        response.success = false
    }
    if (!req.body?.userTypeId) {
        response.messages.push("Please add a userType")
        response.success = false
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body?.userEmail))) {
        response.messages.push("Please add a valid email")
        response.success = false
    }
    if (req?.body?.userPassword < 6) {
        response.messages.push("Please add a valid password")
        response.success = false
    }
    if (req?.body?.userPassword != req?.body?.password_confirmation) {
        response.messages.push("Your password and password confirmation do not match")
        response.success = false
    }
    if (!response.success) {
        res.send(response)
        return
    }
    const [user, created] = await models.Users.findOrCreate({
        where: {
            userEmail: req.body.userEmail
        },
        defaults: {
            userName: req.body.userName,
            cityId: req.body.cityId,
            userPhone: req.body.userPhone,
            userTypeId: req.body.userTypeId,
            userPassword: authService.hashPassword(req.body.userPassword)
        }
    });
    if (created) {
        response.messages.push("User successfully created")
        response.success = true
        res.send(response);
    } else {
        response.messages.push("This user already exists")
        response.success = false
        res.send(response);
    }
}

exports.login = async function (req, res, next) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }
    models.Users.findOne({
        where: {
            userEmail: req.body.userEmail
        }
    }).then(user => {
        console.log("usernn", user)
        if (!user) {
            response.messages.push("Login Failed")
            response.success = false
            res.send(response);
        } else {
            let passwordMatch = authService.comparePasswords(req.body.userPassword, user.userPassword);
            if (passwordMatch) {
                let token = authService.signUser(user);
                response.messages.push("Login successful")
                response.success = true
                response.token = token
                res.send(response);
            } else {
                response.messages.push("Wrong password")
                response.success = false
                res.send(response);
            }
        }
    })
        .catch(err => {
            res.status(400);
            response.messages.push("There was a problem in logging in. Make sure of the information you entered")
            response.success = false
            res.send(response)
        });
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
    const user = await models.Users.findByPk(id, {
        include: [
            { model: models.Cities },
            { model: models.UserType },
            {
                model: models.Requests,
                include: [
                    { model: models.FarmKinds },
                    { model: models.Crops }
                ],

            },



        ],
    })
    if (user) {
        response.success = true;
        response.data = user
    } else {
        response.messages.push("user not found")
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

    const updated = await models.Users.findByPk(id)
    if (updated) {
        if (req.body.userName) {
            updated.userName = req.body.userName
        }
        if (req.body.cityId) {
            updated.cityId = req.body.cityId
        }
        if (req.body.userPhone) {
            updated.userPhone = req.body.userPhone
        }
        if (req.body.userPassword) {
            updated.userPassword = authService.hashPassword(req.body.userPassword)
        }
        if (req.body.userEmail) {
            updated.userEmail = req.body.userEmail
        }
        updated.save().then((user) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = user
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
    const deleted = await models.Users.destroy({
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


/// userType Routes
exports.indexUserType = function (req, res) {
    var response = {
        success: false,
        messages: [],
        data: {}
    }

    models.UserType.findAll({
        include: [
            models.Users
        ],

    })
        .then(userType => {
            if (Array.isArray(userType)) {
                response.data = userType
                response.success = true
            } else {
                response.messages.push("hi")
            }
        }).finally(() => {
            res.send(response)
        })
}


exports.showUserType = async function (req, res, next) {
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
    const userType = await models.UserType.findByPk(id)
    if (userType) {
        response.success = true;
        response.data = userType
    } else {
        response.messages.push("userType not found")
        res.status(404)
    }
    res.send(response)
}

exports.storeUserType = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    if (!req.body?.userType) {
        response.messages.push("Please add a name")
        response.success = false
    }

    if (!response.success) {
        res.send(response)
        return
    }
    const [userType, created] = await models.UserType.findOrCreate({
        where: {
            userType: req.body.userType
        },
        defaults: {
            userType: req.body.userType
        }
    });
    if (created) {
        response.messages.push("UserType successfully created")
        response.success = true
        res.send(response);
    } else {
        response.messages.push("This userType already exists")
        response.success = false
        res.send(response);
    }
}

exports.updateUSerType = async function (req, res, next) {
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
    if (!req.body?.userType) {
        response.messages.push("Please add a name")
        response.success = false
    }

    if (!response.success) {
        res.send(response)
        return
    }
    const updated = await models.UserType.findByPk(id)
    if (updated) {
        if (req.body.userType) {
            updated.userType = req.body.userType
        }

        updated.save().then((userType) => {
            response.messages.push('Successfully Updated')
            response.success = true
            response.data = userType
            res.send(response)
        })
    } else {
        res.status(400);
        response.messages.push('There was a problem updating the user.  Please check the userType information.')
        response.success = false
        res.send(response)
    }

}


exports.deleteUserType = async function (req, res, next) {
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
    const deleted = await models.UserType.destroy({
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
