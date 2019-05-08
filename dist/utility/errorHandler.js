"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utility/logger");
exports.logging = (err, req, res, next) => {
    logger_1.OrderAPILogger.logger.error(err);
    next(err);
};
exports.clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    }
    else {
        next(err);
    }
};
exports.errorHandler = (err, req, res, next) => {
    res.status(500).send({
        error: err.message
    });
};
