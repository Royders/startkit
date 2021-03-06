"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    userStatus: Number,
    username: String,
});
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
