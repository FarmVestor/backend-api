var models = require('../models');
var authService = require('../services/auth');

exports.index = function (req, res) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    models.Users.findAll({
        include: [
            models.Cities
        ]
    })
        .then(users => {
            if (Array.isArray(users)) {
                response.data = users
                response.success = true
            } else {
                response.message.push("hi")
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
    if (!req.body?.userName?.length) {
        response.messages.push("Please add a name")
        response.success = false
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body?.userEmail))) {
        response.messages.push("Please add a valid email")
        response.success = false
    }
    if (req?.body?.userPassword?.length < 6) {
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