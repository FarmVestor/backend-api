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
            models.Crops
        ],
        include: [
            models.FarmKinds
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