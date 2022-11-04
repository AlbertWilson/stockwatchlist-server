"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yahooFinance = require('yahoo-finance');
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
exports.default = getFullStockDataMonthlyChange;
//# sourceMappingURL=getFullStockListDataMonthlyChange.js.map