import FullStockData from '../model/FullStockData';

var yahooFinance = require('yahoo-finance');

export default function getFullStockListDataDailyChange(watchlist:String[]): Promise<FullStockData[]> {
  if (watchlist === undefined || watchlist.length == 0){
    return new Promise<any>(function(resolve, reject){resolve([]);});
  }

  const stockData:Promise<FullStockData[]> = yahooFinance.quote({
      symbols: watchlist,
      modules: ['price']
    }).then((quotes) => {
      return Object.keys(quotes).map((symbol:any) => {
        const fullStockInfo:FullStockData = {
          companyName: quotes[symbol].price.longName,
          symbol: quotes[symbol].price.symbol,
          todayPrice: quotes[symbol].price.regularMarketPrice,
          todayPriceChange: quotes[symbol].price.regularMarketChange,
          todayPricePercentChange: (quotes[symbol].price.regularMarketChange / quotes[symbol].price.regularMarketPrice) * 100
        }
        return fullStockInfo;
      })
    }).catch((err:Error) => {
      throw err;
    });
  return stockData;
}