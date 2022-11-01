"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
function connectToDataBase() {
    const connectionString = "mongodb+srv://admin:hello@cluster0.blihqrn.mongodb.net/?retryWrites=true&w=majority/stock_watchlist";
    mongoose.connect(connectionString, { useNewUrlParser: true }, () => {
        console.log('Connected to DB');
    });
}
exports.default = connectToDataBase;
//# sourceMappingURL=conn.js.map