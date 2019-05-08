"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../utility/");
exports.getApi = (req, res, next) => {
    return utility_1.formatOutput(res, { title: 'Order API' }, 200, 'api');
};
