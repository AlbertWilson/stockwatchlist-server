const jwt = require("jsonwebtoken");

export default function verifyJWTtoken(req, res, next) {  

    const token = req.headers["x-access-token"]?.split(' ')[1]; // if the token is not empty split to get rid of "bearer"

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) return res.send({
          isLoggedIn: false,
          message: "Failed to Authenticate"
        })
        req.user = {};
        req.user.id = decoded.id;
        req.user.firstname = decoded.firstname;
        req.user.email = decoded.email;
        next(); // can only move on to grabbing the data if jwt has been verified
      })
    }
    else {
      res.send({message: "token is invalid", isLoggedIn: false})
    }
}