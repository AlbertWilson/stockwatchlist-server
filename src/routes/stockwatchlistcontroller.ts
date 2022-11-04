const express = require('express');
const stockwatchlistcontroller = express.Router();
import verifyJWT from '../util/verifyJWT';
import { ObjectId } from 'mongodb';
import User from '../model/UserSchema'
import getFullStockListDataDailyChange from '../util/getFullStockListDataDailyChange';
import getFullStockListDataWeeklyChange from '../util/getFullStockListDataWeeklyChange';
import getFullStockListMonthlyChange from '../util/getFullStockListDataMonthlyChange';

stockwatchlistcontroller.route('/stocks').get(verifyJWT, async function (req, res){
  const userId:ObjectId = new ObjectId(req.user.id);

  User.findOne({_id: userId}, async function (err, doc){

    if (err) {
      res.status(404).send(err);
    } else {
      try {
        const watchlist = await getFullStockListDataDailyChange(doc.watchlist);
        const watchlistWithWeekData = await getFullStockListDataWeeklyChange(watchlist);
        const watchlistWithMonthData = await getFullStockListMonthlyChange(watchlistWithWeekData);
        res.send(watchlistWithMonthData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  })
});

stockwatchlistcontroller.route('/addStock').post(verifyJWT, async function (req, res) {

    const singleStockList = [req.body.symbol];

    try{
      const newStock = await getFullStockListDataDailyChange(singleStockList);
      const newStockWithWeekData = await getFullStockListDataWeeklyChange(newStock);
      const newStockWithMonthData = await getFullStockListMonthlyChange(newStockWithWeekData);

      const userId:ObjectId = new ObjectId(req.user.id);

      User.findOne({_id: userId}, function(err, doc) {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        } else {
          doc.watchlist = [...doc.watchlist, newStockWithMonthData[0].symbol];
          doc.save();
          res.send(newStockWithMonthData[0]);
        }
      });
    } catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
});

stockwatchlistcontroller.route('/deleteStock').post(verifyJWT, async function (req, res) {
  
  const stocksToDelete:String[] = req.body.symbols;

  const userId:ObjectId = new ObjectId(req.user.id);

  User.findOne({_id: userId}, function(err, doc) {
    if (err) {
      res.status(404).send(err);
    } else {
      doc.watchlist = doc.watchlist.filter(item => !stocksToDelete.includes(item));
      doc.save();
      res.send("successful deletion");
    }
  });
});

export default stockwatchlistcontroller;