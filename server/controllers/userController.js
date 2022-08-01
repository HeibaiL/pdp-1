const userService = require('../services/userService');
const fbService = require('../services/fbService');
// const ApiError = require('../exceptions/api-error')

class UserController {
    async registerUser(req, res, next) {
        try {
            const userData = await userService.registerUser(req.body);
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: false, maxAge: 30 * 24 * 60 * 1000})
            return res.json(userData);
        } catch (err) {
            next(err)
        }

    }

    async loginUser(req, res, next) {
        try {
            const userData = await userService.loginUser(req.body);
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: false, maxAge: 30 * 24 * 60 * 1000})
            return res.json(userData);
        } catch (err) {
            next(err)
        }
    }

    async logoutUser(req, res) {
        const {refreshToken} = req.cookies;
        const user = await userService.logoutUser(refreshToken);
        res.clearCookie("refreshToken");
        return res.send(user);
    }

    async fbLogin(req, res, next) {
        const data = req.body;
        try {
            const userAccessToken = await fbService.exchangeCodeForAccessToken(data.code);
            const appAccessToken = await fbService.getAppAccessToken()
            const userData = await fbService.validateFbToken(userAccessToken.access_token, appAccessToken.access_token);
            console.log(userData)
        }catch(ex){
            next(ex)
        }
    }

}

module.exports = new UserController();