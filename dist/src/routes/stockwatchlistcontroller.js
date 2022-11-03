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
var yahooFinance = require('yahoo-finance');
function getFullStockDataDailyChange(watchlist) {
    if (watchlist === undefined || watchlist.length == 0) {
        return new Promise(function (resolve, reject) { resolve([]); });
    }
    const stockData = yahooFinance.quote({
        symbols: watchlist,
        modules: ['price']
    }).then((quotes) => {
        return Object.keys(quotes).map((symbol) => {
            const fullStockInfo = {
                companyName: quotes[symbol].price.longName,
                symbol: quotes[symbol].price.symbol,
                todayPrice: quotes[symbol].price.regularMarketPrice,
                todayPriceChange: quotes[symbol].price.regularMarketChange,
                todayPricePercentChange: quotes[symbol].price.regularMarketChangePercent
            };
            return fullStockInfo;
        });
    }).catch((err) => {
        throw err;
    });
    return stockData;
}
function getFullStockDataWeeklyChange(watchlist) {
    if (watchlist === undefined || watchlist.length == 0) {
        return new Promise(function (resolve, reject) { resolve([]); });
    }
    const stockSymbols = watchlist.map((stock) => { return stock.symbol; });
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const dayOfWeek = oneWeekAgo.getDay();
    if (dayOfWeek == 0) {
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 2); // if it's Sunday get the stock price from Friday
    }
    else if (dayOfWeek == 6) {
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 1); // if it's Saturday get the stock price from Friday
    }
    const stockData = yahooFinance.historical({
        symbols: stockSymbols,
        from: oneWeekAgo,
        to: oneWeekAgo,
    }).then((quotes) => {
        return watchlist.map((stock) => {
            if (quotes[stock.symbol][0] != undefined) {
                stock.price7DaysAgo = quotes[stock.symbol][0].close;
            }
            else {
                stock.price7DaysAgo = null;
            }
            return stock;
        });
    });
    return stockData;
}
function getFullStockDataMonthlyChange(watchlist) {
    if (watchlist === undefined || watchlist.length == 0) {
        return new Promise(function (resolve, reject) { resolve([]); });
    }
    const stockSymbols = watchlist.map((stock) => { return stock.symbol; });
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const dayOfWeek = oneMonthAgo.getDay();
    if (dayOfWeek == 0) {
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 2); // if it's Sunday get the stock price from Friday
    }
    else if (dayOfWeek == 6) {
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 1); // if it's Saturday get the stock price from Friday
    }
    const stockData = yahooFinance.historical({
        symbols: stockSymbols,
        from: oneMonthAgo,
        to: oneMonthAgo,
    }).then((quotes) => {
        return watchlist.map((stock) => {
            if (quotes[stock.symbol][0] != undefined) {
                stock.price30DaysAgo = quotes[stock.symbol][0].close;
            }
            else {
                stock.price30DaysAgo = null;
            }
            return stock;
        });
    });
    return stockData;
}
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
                        const watchlist = yield getFullStockDataDailyChange(doc.watchlist);
                        const watchlistWithWeekData = yield getFullStockDataWeeklyChange(watchlist);
                        const watchlistWithMonthData = yield getFullStockDataMonthlyChange(watchlistWithWeekData);
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
            const newStock = yield getFullStockDataDailyChange(singleStockList);
            const newStockWithWeekData = yield getFullStockDataWeeklyChange(newStock);
            const newStockWithMonthData = yield getFullStockDataMonthlyChange(newStockWithWeekData);
            const userId = new mongodb_1.ObjectId(req.user.id);
            UserSchema_1.default.findOne({ _id: userId }, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.status(404).send(err);
                }
                else {
                    doc.watchlist = [...doc.watchlist, newStockWithMonthData[0].symbol];
                    doc.save();
                    console.log(newStockWithMonthData);
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
                console.log(doc.watchlist);
                console.log(stocksToDelete);
                doc.watchlist = doc.watchlist.filter(item => !stocksToDelete.includes(item));
                doc.save();
                res.send("successful deletion");
            }
        });
    });
});
exports.default = stockwatchlistcontroller;
//# sourceMappingURL=stockwatchlistcontroller.js.map