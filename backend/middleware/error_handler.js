const createHttpError = require("http-errors");

//404 not found error
const notFoundError = (req, res, next) => {
    next(createHttpError(400, "Site is not found!"));
}

//default error handlers
const errorHandler = (err, req, res, next) => {

    res.locals.error = process.env.NODE_ENV === "development" ? err.message : { message: err.message };

    res.status(err.status || 500).json(res.locals.error);
}

module.exports = { notFoundError, errorHandler };
