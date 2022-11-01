"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: {
        type: [],
        required: false
    }
});
const User = mongoose.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=UserSchema.js.map