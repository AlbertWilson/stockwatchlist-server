"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJWT_1 = __importDefault(require("../../src/util/verifyJWT"));
const jwt = require('jsonwebtoken');
test('verifyValidToken', () => {
    const spy = jest.spyOn(jwt, 'verify');
    spy.mockReturnValue({ payload: {}, header: {}, signature: {} });
    const req = { headers: { "x-access-token": 'hello' } };
    const res = { send: (obj) => { return obj; } };
    const next = {};
    (0, verifyJWT_1.default)(req, res, next);
});
//# sourceMappingURL=verifyJWT.test.js.map