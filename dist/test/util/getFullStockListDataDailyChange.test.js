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
const globals_1 = require("@jest/globals");
const getFullStockListDataDailyChange_1 = __importDefault(require("../../src/util/getFullStockListDataDailyChange"));
const mockYahooFinance = jest.requireActual('yahoo-finance');
jest.doMock('yahoo-finance', () => mockYahooFinance);
(0, globals_1.describe)('Get Full Stock Data Daily Change', () => {
    (0, globals_1.test)('with empty watchlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const watchlist = [];
        try {
            const stocklist = yield (0, getFullStockListDataDailyChange_1.default)(watchlist);
            (0, globals_1.expect)(stocklist.length).toEqual(0);
        }
        catch (err) {
            console.log(err);
            (0, globals_1.expect)(true).toBe(false);
        }
    }));
    (0, globals_1.test)('with single element watchlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const watchlist = ['AAPL'];
        try {
            mockYahooFinance.quote = jest.fn().mockReturnValue(Promise.resolve({ "AAPL": { "price": { "maxAge": 1, "preMarketChangePercent": -0.020478498, "preMarketChange": -2.97, "preMarketTime": "2022-11-03T13:29:59.000Z", "preMarketPrice": 142.06, "preMarketSource": "FREE_REALTIME", "regularMarketChangePercent": -0.0316486, "regularMarketChange": -4.5899963, "regularMarketTime": "2022-11-03T17:14:06.000Z", "priceHint": 2, "regularMarketPrice": 140.44, "regularMarketDayHigh": 142.795, "regularMarketDayLow": 139.27, "regularMarketVolume": 56696912, "regularMarketPreviousClose": 145.03, "regularMarketSource": "FREE_REALTIME", "regularMarketOpen": 142.06, "exchange": "NMS", "exchangeName": "NasdaqGS", "exchangeDataDelayedBy": 0, "marketState": "REGULAR", "quoteType": "EQUITY", "symbol": "AAPL", "underlyingSymbol": null, "shortName": "Apple Inc.", "longName": "Apple Inc.", "currency": "USD", "quoteSourceName": "Nasdaq Real Time Price", "currencySymbol": "$", "fromCurrency": null, "toCurrency": null, "lastMarket": null, "marketCap": 2234133512192 } } }));
            const stocklist = yield (0, getFullStockListDataDailyChange_1.default)(watchlist);
            (0, globals_1.expect)(stocklist.length).toEqual(1);
            (0, globals_1.expect)(stocklist[0].symbol).toBe('AAPL');
            (0, globals_1.expect)(stocklist[0].todayPrice).toBe(140.44);
        }
        catch (err) {
            (0, globals_1.expect)(true).toBe(false);
        }
    }));
});
//# sourceMappingURL=getFullStockListDataDailyChange.test.js.map