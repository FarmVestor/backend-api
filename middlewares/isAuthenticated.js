const authService = require('../services/auth');

exports.isAuthenticated = async function(req, res, next) {

    const token = req?.cookies?.jwt ||
    req?.headers?.authorization?.split(" ")[1] || null
    req?.headers?.Authorization?.split(" ")[1] ||null;
    let isVerfied = await authService.verifyUser(token);
    console.log('isVerfied', isVerfied)
    console.log('token', token)

    if (isVerfied) {
        req.user = isVerfied
        console.log("---------req user--------",req.user)
        return next()
    }
    res.status(401)
    res.send({
        success: false,
        messages: [
            'Please login to access this endpoint'
        ]
    })
    return 
}