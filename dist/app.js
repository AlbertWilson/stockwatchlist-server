"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(require('./src/routes/stockwatchlistcontroller'));
app.use(require('./src/routes/userauthcontroller'));
// Global error handling
app.use(function (err, _req, res) {
});
// perform a database connection when the server starts
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log("Connected to DB!");
});
// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map