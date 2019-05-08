"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./utility/errorHandler");
const express = require("express");
const config = require("config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const logger_1 = require("./utility/logger");
const api_1 = require("./routes/api");
const order_1 = require("./routes/order");
const user_1 = require("./routes/user");
class Server {
    constructor(port = 5003) {
        this.userRoutes = new user_1.UserRoute();
        this.env = process.env.NODE_ENV || 'development';
        this.apiRoutes = new api_1.APIRoute();
        this.orderRoutes = new order_1.OrderRoute();
        this.mongoUrl = config.get('mongo.URI');
        this.app = express();
        this.app.set('port', port);
        this.app.set('env', this.env);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.applyLogger();
        this.applyRoutes();
        this.applyMiddleWare();
        this.start();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mongoSetup();
            this.app.listen(this.app.get('port'), () => {
                logger_1.OrderAPILogger.logger.info(`Server [${config.get('name')}] is running at http://localhost:${this.app.get('port')} in ${this.app.get('env')} Mode`);
                logger_1.OrderAPILogger.logger.info('Press CTRL-C to stop');
            });
        });
    }
    applyLogger() {
        this.app.use(morgan(config.get('morganFormat'), { stream: new logger_1.WinstonStream() }));
    }
    applyMiddleWare() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(errorHandler.logging);
        this.app.use(errorHandler.clientErrorHandler);
        this.app.use(errorHandler.errorHandler);
        logger_1.OrderAPILogger.logger.info('Applied middleware: [HELMET][CORS][COMPRESSION][LOGGING][ERROR HANDLER]');
    }
    applyRoutes() {
        this.userRoutes.routes(this.app);
        this.apiRoutes.routes(this.app);
        this.orderRoutes.routes(this.app);
        logger_1.OrderAPILogger.logger.info('Applied Routes: [USER][AUTHENTICATION][BUISNESS LOGIC]');
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose.connect(this.mongoUrl, config.get('mongo.config'));
                logger_1.OrderAPILogger.logger.info(`Connection to MongoDB at ${this.mongoUrl} established`);
            }
            catch (err) {
                logger_1.OrderAPILogger.logger.error(`Connection to MONGO DB failed : ${err} - Shutting down Server`);
            }
        });
    }
}
exports.default = Server;
