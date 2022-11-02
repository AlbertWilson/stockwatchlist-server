"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function verifyJWTtoken(req, res, next) {
    var _a;
    const token = (_a = req.headers["x-access-token"]) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // if the token is not empty split to get rid of "bearer"
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.send({
                    isLoggedIn: false,
                    message: "Failed to Authenticate"
                });
            req.user = {};
            req.user.id = decoded.id;
            req.user.firstname = decoded.firstname;
            req.user.email = decoded.email;
            next(); // can only move on to grabbing the data if jwt has been verified
        });
    }
    else {
        res.send({ message: "token is invalid", isLoggedIn: false });
    }
}
exports.default = verifyJWTtoken;
//# sourceMappingURL=verifyJWT.js.map