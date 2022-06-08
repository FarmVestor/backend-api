var models = require('../models');
var authService = require('../services/auth');
var models = require('../models');
var authService = require('../services/auth');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


var { farmTransformer, farmsTransformers } = require('../Transformaers/farmTransformers');
const { sequelize } = require('../models');

exports.index = async function (req, res) {
    var response = {
        success: true,
        messages: [],
        users:{},
        farms: {},
        investors: {},
        farmers: {},
        deals: {},
        requests: {}

    }

    const numUsers = await models.Users.count({
        where: {
            deleted: 0

        }
    })
    response.users.numUsers = numUsers

    ///farms reports
    const numFarms = await models.Farms.count({
        where: {
            deleted: 0

        }
    })
    response.farms.numFarms = numFarms

    const numAvFarms = await models.Farms.count({
        where: {
            farmAvailable: 1,
            deleted: 0

        }
    }
    )
    response.farms.numAvFarms = numAvFarms

    const TODAY = new Date();
    const TodayFarms = await models.Farms.count({
        where: {
            createdAt: TODAY,
            deleted: 0

        }
    }
    )
    response.farms.TodayFarms = TodayFarms



    /// investors reports
    const numInvestors = await models.Users.count({
        where: {
            deleted: 0,
            userTypeId: 3,

        }
    })
    response.investors.numInvestors = numInvestors



    const TodayInvestors = await models.Users.count({
        where: {
            createdAt: TODAY,
            deleted: 0

        }
    }
    )
    response.investors.TodayInvestors = TodayInvestors

    /// Farmers reports
    const numFarmers = await models.Users.count({
        where: {
            deleted: 0,
            userTypeId: 2,

        }
    })
    response.farmers.numFarmers = numFarmers



    const TodayFarmers = await models.Users.count({
        where: {
            createdAt: TODAY,
            deleted: 0

        }
    }
    )
    response.farmers.TodayFarmers = TodayFarmers


    //Deals Reports 
    const numDeals = await models.Deal.count({
        where: {
            deleted: 0,

        }
    })
    response.deals.numDeals = numDeals

    const numAgreedDeels = await models.Deal.count({
        where: {
            deleted: 0,
            dealStatus: 1

        }
    })
    response.deals.numAgreedDeels = numAgreedDeels

    const numNotAgreedDeels = await models.Deal.count({
        where: {
            deleted: 0,
            dealStatus: 0,

        }
    })
    response.deals.numNotAgreedDeels = numNotAgreedDeels


    const numDealedByInvestors = await models.Deal.count({
        where: {
            deleted: 0,
            investorId: {
                [Op.ne]: null
            }
        }
    })
    response.deals.numDealedByInvestors = numDealedByInvestors

    const numDealedByAgents = await models.Deal.count({
        where: {
            deleted: 0,
            agentId: {
                [Op.ne]: null
            }
        }
    })
    response.deals.numDealedByAgents = numDealedByAgents

    //Request Reports
    const numRequests = await models.Requests.count({
        where: {
            deleted: 0,

        }
    })
    response.requests.numRequests = numRequests


    const mostWantedCrop = await models.Requests.findAll({
        attributes: ['cropId', [sequelize.fn('COUNT', sequelize.col('cropId')), 'counts']],
        include: [
            {
                model: models.Crops,
                attributes: ['cropName'],

            }
        ],
        group: ['cropId'],
       
    }) 
    response.requests.mostWantedCrop = mostWantedCrop

    res.send(response)
}