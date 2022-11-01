import verifyJWT from '../../src/util/verifyJWT';
const jwt = require('jsonwebtoken');
import Response from "express"

test('verifyValidToken', () => {
    const spy = jest.spyOn(jwt, 'verify');
    spy.mockReturnValue({payload: {}, header: {}, signature: {}});
    const req = {headers: {"x-access-token": 'hello'}};
    const res = {send: (obj) => {return obj}};
    const next = {};
    verifyJWT(req, res, next);
});