const createHttpError = require("http-errors");
//404 not found error
const accessCheck = (req, res, next) => {
    if (req.params.key === process.env.API_KEY) next();
    next(createHttpError(404, "Site is not found!"));
}
module.exports = accessCheck;