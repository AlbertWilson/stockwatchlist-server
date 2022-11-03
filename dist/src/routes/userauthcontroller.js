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
const express = require('express');
const userauthcontroller = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const verifyJWT_1 = __importDefault(require("../util/verifyJWT"));
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
userauthcontroller.route('/register').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const takenEmail = yield UserSchema_1.default.findOne({ email: user.email }); //check to make sure that the email is not taken
        if (takenEmail) {
            res.status(400).send("email has already been taken");
        }
        else {
            user.password = yield bcrypt.hash(req.body.password, 10);
            const dbUser = new UserSchema_1.default({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password
            });
            dbUser.save();
            res.send("User has been added to database!");
        }
    }
    catch (err) {
        res.status(500).send("And error occured: " + err);
    }
}));
userauthcontroller.route('/login').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoggingIn = req.body;
    yield UserSchema_1.default.findOne({ email: userLoggingIn.email }).then(dbUser => {
        if (!dbUser) {
            return res.status(404).send("Invalid email or password");
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    email: dbUser.email,
                    firstname: dbUser.firstname
                };
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
                    if (err)
                        return res.send(err);
                    return res.send({
                        message: "Success",
                        token: "Bearer " + token
                    });
                });
            }
            else {
                return res.status(404).send({ message: "Invalid email or password" });
            }
        });
    }).catch((err) => res.status(500).send({ message: "Error making database call" }));
}));
userauthcontroller.route("/isUserAuth").post(verifyJWT_1.default, (req, res) => {
    return res.send({ isLoggedIn: true, firstname: req.user.firstname });
});
exports.default = userauthcontroller;
//# sourceMappingURL=userauthcontroller.js.map