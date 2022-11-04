const jwt = require('jsonwebtoken')

export default function verifyJWTtoken(req, res, next) {  

    if (!req.headers || !req.headers['x-access-token']){
      res.status(403).send({message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false})
    } else {
      const token = req.headers["x-access-token"]?.split(' ')[1]; // if the token is not empty split to get rid of "Bearer"

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => handleVerify(err, decoded))
      }
    }

    function handleVerify(err, decoded) {
      if (err) return res.status(401).send({
        isLoggedIn: false,
        message: "Failed to Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id;
      req.user.firstname = decoded.firstname;
      req.user.email = decoded.email;
      next(); // can only move on to grabbing the data if jwt has been verified
    }

}