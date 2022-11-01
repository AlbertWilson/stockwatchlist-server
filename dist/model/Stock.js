"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const StockSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true
    }
});
const Stock = mongoose.model('Stock', StockSchema);
exports.default = Stock;
//# sourceMappingURL=Stock.js.map