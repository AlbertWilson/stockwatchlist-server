"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWTtoken(req, res, next) {
    var _a;
    if (!req.headers || !req.headers['x-access-token']) {
        res.status(403).send({ message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false });
    }
    else {
        const token = (_a = req.headers["x-access-token"]) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // if the token is not empty split to get rid of "bearer"
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                console.log("Decoded is: " + decoded);
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
    }
}
exports.default = verifyJWTtoken;
//# sourceMappingURL=verifyJWT.js.map