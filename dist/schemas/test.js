"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
// Export the model and return your IUser interface
exports.default = mongoose.model('User', UserSchema);
