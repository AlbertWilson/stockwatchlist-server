import {describe, expect, test} from '@jest/globals';
import getFullStockListDataDailyChange from '../../src/util/getFullStockListDataDailyChange';
const mockYahooFinance = jest.requireActual('yahoo-finance');
jest.doMock('yahoo-finance', () => mockYahooFinance);


describe('Get Full Stock Data Daily Change', () => {

    test('with empty watchlist', async () => {

        const watchlist = [];

        try {
            const stocklist = await getFullStockListDataDailyChange(watchlist);
            expect(stocklist.length).toEqual(0);
        } catch (err) {
            console.log(err);
            expect(true).toBe(false);
        }
    });

    test('with single element watchlist', async () => {

        const watchlist = ['AAPL'];

        try {
            mockYahooFinance.quote = jest.fn().mockReturnValue(Promise.resolve({"AAPL":{"price":{"maxAge":1,"preMarketChangePercent":-0.020478498,"preMarketChange":-2.97,"preMarketTime":"2022-11-03T13:29:59.000Z","preMarketPrice":142.06,"preMarketSource":"FREE_REALTIME","regularMarketChangePercent":-0.0316486,"regularMarketChange":-4.5899963,"regularMarketTime":"2022-11-03T17:14:06.000Z","priceHint":2,"regularMarketPrice":140.44,"regularMarketDayHigh":142.795,"regularMarketDayLow":139.27,"regularMarketVolume":56696912,"regularMarketPreviousClose":145.03,"regularMarketSource":"FREE_REALTIME","regularMarketOpen":142.06,"exchange":"NMS","exchangeName":"NasdaqGS","exchangeDataDelayedBy":0,"marketState":"REGULAR","quoteType":"EQUITY","symbol":"AAPL","underlyingSymbol":null,"shortName":"Apple Inc.","longName":"Apple Inc.","currency":"USD","quoteSourceName":"Nasdaq Real Time Price","currencySymbol":"$","fromCurrency":null,"toCurrency":null,"lastMarket":null,"marketCap":2234133512192}}}));

            const stocklist = await getFullStockListDataDailyChange(watchlist);
            expect(stocklist.length).toEqual(1);
            expect(stocklist[0].symbol).toBe('AAPL');
            expect(stocklist[0].todayPrice).toBe(140.44);

        } catch (err) {
            expect(true).toBe(false);
        }
    });
});