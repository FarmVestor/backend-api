
const authService = require('../services/auth');

exports.isAdmin = async function(req, res, next) {

    const token = req?.cookies?.jwt ||
    req?.headers?.authorization?.split(" ")[1] || null
    req?.headers?.Authorization?.split(" ")[1] ||null;
    let isVerfied = await authService.verifyUser(token);
    console.log('isVerfied', isVerfied)
    console.log('token', token)

    if (isVerfied.userTypeId==1) {
        
        console.log("---------req user--------",isVerfied)
        return next()
    }
    res.status(401)
    res.send({
        success: false,
        messages: [
            'You have to be an admin to access this endpoint'
        ]
    })
    return 
}