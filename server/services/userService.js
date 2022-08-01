const bcrypt = require('bcrypt');
const {User} = require('../schemas/userSchema');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/api-error')

class UserService {
    async registerUser(userData) {
        const {name, email, password, birthday} = userData;
        const dbUser = await User.findOne({email});

        if (dbUser) {
            throw ApiError.BadRequest("User with this email already exists")
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, birthday, password: hashedPassword});
        const tokens = await tokenService.generateTokens({id: user._id, email: user.email})
        await tokenService.saveRefreshToken(user._id, tokens.refreshToken);

        return {user, ...tokens}
    }

    async loginUser(userData) {
        const {email, password} = userData;
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('User not found')
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            throw ApiError.BadRequest('Wrong password')
        }
        const tokens = tokenService.generateTokens(user);
        await tokenService.saveRefreshToken(user._id, tokens.refreshToken)
        return {user, ...tokens}
    }

    async logoutUser(refreshToken) {
        const tokenData = await tokenService.removeRefreshToken(refreshToken);
        return User.findOne({id: tokenData.userId});
    }
}

module.exports = new UserService();