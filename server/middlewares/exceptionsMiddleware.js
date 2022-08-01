const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res) {
        if(err instanceof ApiError){
            return res.status(err.status).send({message: err.message, errors: err.errors});
        }
        return res.sendStatus(500).json('Unexpected error'+ err.message);
}