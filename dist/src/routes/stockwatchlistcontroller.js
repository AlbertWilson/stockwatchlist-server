"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const stockwatchlistcontroller = express.Router();
const verifyJWT_1 = __importDefault(require("../util/verifyJWT"));
const mongodb_1 = require("mongodb");
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
const getFullStockListDataDailyChange_1 = __importDefault(require("../util/getFullStockListDataDailyChange"));
const getFullStockListDataWeeklyChange_1 = __importDefault(require("../util/getFullStockListDataWeeklyChange"));
const getFullStockListDataMonthlyChange_1 = __importDefault(require("../util/getFullStockListDataMonthlyChange"));
stockwatchlistcontroller.route('/stocks').get(verifyJWT_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = new mongodb_1.ObjectId(req.user.id);
        UserSchema_1.default.findOne({ _id: userId }, function (err, doc) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    try {
                        const watchlist = yield (0, getFullStockListDataDailyChange_1.default)(doc.watchlist);
                        const watchlistWithWeekData = yield (0, getFullStockListDataWeeklyChange_1.default)(watchlist);
                        const watchlistWithMonthData = yield (0, getFullStockListDataMonthlyChange_1.default)(watchlistWithWeekData);
                        res.send(watchlistWithMonthData);
                    }
                    catch (err) {
                        console.log(err);
                        res.status(500).send(err);
                    }
                }
            });
        });
    });
});
stockwatchlistcontroller.route('/addStock').post(verifyJWT_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const singleStockList = [req.body.symbol];
        try {
            const newStock = yield (0, getFullStockListDataDailyChange_1.default)(singleStockList);
            const newStockWithWeekData = yield (0, getFullStockListDataWeeklyChange_1.default)(newStock);
            const newStockWithMonthData = yield (0, getFullStockListDataMonthlyChange_1.default)(newStockWithWeekData);
            const userId = new mongodb_1.ObjectId(req.user.id);
            UserSchema_1.default.findOne({ _id: userId }, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.status(404).send(err);
                }
                else {
                    doc.watchlist = [...doc.watchlist, newStockWithMonthData[0].symbol];
                    doc.save();
                    res.send(newStockWithMonthData[0]);
                }
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
});
stockwatchlistcontroller.route('/deleteStock').post(verifyJWT_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stocksToDelete = req.body.symbols;
        const userId = new mongodb_1.ObjectId(req.user.id);
        UserSchema_1.default.findOne({ _id: userId }, function (err, doc) {
            if (err) {
                res.status(404).send(err);
            }
            else {
                doc.watchlist = doc.watchlist.filter(item => !stocksToDelete.includes(item));
                doc.save();
                res.send("successful deletion");
            }
        });
    });
});
exports.default = stockwatchlistcontroller;
//# sourceMappingURL=stockwatchlistcontroller.js.map