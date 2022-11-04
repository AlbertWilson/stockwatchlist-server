"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yahooFinance = require('yahoo-finance');
function getFullStockListDataDailyChange(watchlist) {
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
exports.default = getFullStockListDataDailyChange;
//# sourceMappingURL=getFullStockListDataDailyChange.js.map