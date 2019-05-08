"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, prettyPrint, printf, json } = winston_1.format;
const mongoose = require("mongoose");
class OrderAPILogger {
}
OrderAPILogger.myFormat = printf(info => {
    return `[${info.timestamp}] [${info.level}] => ${info.message}`;
});
OrderAPILogger.logger = winston_1.createLogger({
    transports: [
        new winston_1.transports.File({
            level: 'info',
            filename: 'aggregated.log',
            format: combine(label({ label: 'order-api errors' }), timestamp(), json()),
        }),
        new winston_1.transports.Console({
            level: 'info',
            handleExceptions: true,
            format: combine(label({ label: 'order-api errors' }), timestamp(), printf(info => {
                return `[${info.timestamp}] [${info.level}] => ${info.message}`;
            })),
        }),
    ],
    exitOnError: false,
});
exports.OrderAPILogger = OrderAPILogger;
class WinstonStream {
    write(text) {
        mongoose.set('debug', true);
        OrderAPILogger.logger.info(text);
        OrderAPILogger.logger.debug(text);
    }
}
exports.WinstonStream = WinstonStream;
