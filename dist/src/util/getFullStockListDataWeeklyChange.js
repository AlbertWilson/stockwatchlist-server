"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yahooFinance = require('yahoo-finance');
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
exports.default = getFullStockDataWeeklyChange;
//# sourceMappingURL=getFullStockListDataWeeklyChange.js.map