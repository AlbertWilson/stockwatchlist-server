import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockwatchlistcontroller from './src/routes/stockwatchlistcontroller';
import userauthcontroller from './src/routes/userauthcontroller'
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(stockwatchlistcontroller);
app.use(userauthcontroller);

// Global error handling
app.use(function (err, _req, res) {
});

// perform a database connection when the server starts
async function connect(){
  try{
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
}

connect();

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});