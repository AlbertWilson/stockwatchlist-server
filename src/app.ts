import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(require('./routes/stockwatchlistcontroller'));
app.use(require('./routes/userauthcontroller'));

// Global error handling
app.use(function (err, _req, res) {
});

// perform a database connection when the server starts
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true}, () => {
  console.log("Connected to DB!")
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});