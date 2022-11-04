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
const verifyJWT_1 = __importDefault(require("../../src/util/verifyJWT"));
const globals_1 = require("@jest/globals");
const mockJWT = jest.requireActual('jsonwebtoken');
jest.doMock('jsonwebtoken', () => mockJWT);
(0, globals_1.describe)('JWT Authorization middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
        };
    });
    (0, globals_1.test)('without headers', () => __awaiter(void 0, void 0, void 0, function* () {
        mockResponse.status = function (responseStatus) {
            return this;
        };
        const expectedResponse = {
            message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false
        };
        (0, verifyJWT_1.default)(mockRequest, mockResponse, nextFunction);
        (0, globals_1.expect)(mockResponse.send).toBeCalledWith(expectedResponse);
    }));
    (0, globals_1.test)('without x-access-token headers', () => __awaiter(void 0, void 0, void 0, function* () {
        mockResponse.status = function (responseStatus) {
            return this;
        };
        const expectedResponse = {
            message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false
        };
        mockRequest = {
            headers: {}
        };
        (0, verifyJWT_1.default)(mockRequest, mockResponse, nextFunction);
        (0, globals_1.expect)(mockResponse.send).toBeCalledWith(expectedResponse);
    }));
});
//# sourceMappingURL=verifyJWT.test.js.map