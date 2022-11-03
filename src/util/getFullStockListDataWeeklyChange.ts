import FullStockData from '../model/FullStockData';

var yahooFinance = require('yahoo-finance');

export default function getFullStockDataWeeklyChange(watchlist:FullStockData[]): Promise<FullStockData[]> {
  if (watchlist === undefined || watchlist.length == 0){
    return new Promise<any>(function(resolve, reject){resolve([]);});
  }
  const stockSymbols = watchlist.map((stock) => {return stock.symbol});
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const dayOfWeek = oneWeekAgo.getDay();

  if ( dayOfWeek == 0 ) {
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 2); // if it's Sunday get the stock price from Friday
  } else if ( dayOfWeek == 6 ) {
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1); // if it's Saturday get the stock price from Friday
  }
  const stockData:Promise<FullStockData[]> = yahooFinance.historical({
      symbols: stockSymbols,
      from: oneWeekAgo,
      to: oneWeekAgo,
    }).then((quotes) => {
      return watchlist.map((stock) => {
        if (quotes[stock.symbol][0] != undefined){
          stock.price7DaysAgo = quotes[stock.symbol][0].close;
        } else {
          stock.price7DaysAgo = null;
        }
        return stock;
      })
    });
  return stockData;
}