"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const server_1 = require("./server");
const app = new server_1.default(config.get('port'));
exports.default = app;
