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
const controller = express.Router();
const Stock_1 = __importDefault(require("../model/Stock"));
const app = express();
var yahooFinance = require('yahoo-finance');
function getFullStockDataDailyChange(watchlist) {
    if (watchlist === undefined || watchlist.length == 0) {
        return new Promise(function (resolve, reject) { resolve([]); });
    }
    const stockSymbols = watchlist.map((stock) => { return stock.symbol; });
    const stockData = yahooFinance.quote({
        symbols: stockSymbols,
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
                stock.price7DaysAgo = 'unavailable';
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
                stock.price30DaysAgo = 'unavailable';
            }
            return stock;
        });
    });
    return stockData;
}
controller.route('/stocks').get(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stocks = Stock_1.default.find((err, stocks) => {
            if (err) {
                res.send(err);
            }
            else {
                getFullStockDataDailyChange(stocks).then((watchlist) => {
                    getFullStockDataWeeklyChange(watchlist).then((stocklist) => {
                        getFullStockDataMonthlyChange(stocklist).then((list) => {
                            res.send(list);
                        });
                    });
                });
            }
        });
    });
});
controller.route('/addStock').post(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stock = new Stock_1.default({
            symbol: req.body.symbol
        });
        const singleStockList = [stock];
        try {
            getFullStockDataDailyChange(singleStockList).then((newStock) => {
                getFullStockDataWeeklyChange(newStock).then((newStock) => {
                    getFullStockDataMonthlyChange(newStock).then((newStock) => {
                        stock.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('Successfully wrote to db');
                            }
                        });
                        res.send(newStock);
                    });
                });
            });
        }
        catch (err) {
            console.error(err);
            res.status(404).send("error");
        }
    });
});
controller.route('/deleteStock').post(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stocksToDelete = req.body;
        console.log(stocksToDelete);
        Stock_1.default.deleteMany({ symbol: stocksToDelete }, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                console.log('Successful deletion');
                res.send('Successfull deletion');
            }
        });
    });
});
module.exports = controller;
//# sourceMappingURL=controller.js.map