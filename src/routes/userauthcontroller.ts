const express = require('express');
const userauthcontroller = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
import User from '../model/UserSchema';
import verifyJWT from '../util/verifyJWT';

userauthcontroller.route('/register').post(async (req, res) => {
    const user = req.body;
    try {
        const takenEmail:string = await User.findOne({email: user.email}); //check to make sure that the email is not taken

        if (takenEmail){
            res.status(400).send("email has already been taken")
        } else {
            user.password = await bcrypt.hash(req.body.password, 10);

            const dbUser = new User({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password
            })

            dbUser.save();
            res.send("User has been added to database!");
        }
    } catch (err) {
        res.status(500).send("And error occured: " + err);
    }
})

userauthcontroller.route('/login').post((req, res) => {
    const userLoggingIn = req.body;

    User.findOne({email: userLoggingIn.email}).then(dbUser => {
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
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.send(err)
                        return res.send({
                            message: "Success",
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.status(404).send({ message: "Invalid email or password"});
            }
        })
    })
})

userauthcontroller.route("/isUserAuth").post(verifyJWT, (req, res) => {
    return res.send({isLoggedIn:true, firstname: req.user.firstname});
})

module.exports = userauthcontroller;
export default userauthcontroller;