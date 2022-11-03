"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userauthcontroller_1 = __importDefault(require("../../src/routes/userauthcontroller"));
const UserSchema_1 = __importDefault(require("../../src/model/UserSchema"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('Test User Auth Controller', function () {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
        };
    });
    (0, globals_1.test)('responds to /login', () => {
        mockRequest = {
            body: {
                email: 'avw5331@gmail.com',
                password: 'password'
            }
        };
        const userSpy = jest.spyOn(UserSchema_1.default, 'findOne');
        // userSpy.mockReturnValue();
        const response = userauthcontroller_1.default.route('/login').post(mockRequest, mockResponse);
        (0, globals_1.expect)(mockResponse.send).toEqual('hello world!');
    });
    (0, globals_1.test)('responds to /register', () => {
        mockRequest = {
            body: {
                email: 'avw5331@gmail.com',
                password: 'password'
            }
        };
        mockResponse.status = function (responseStatus) {
            return this;
        };
        const userSpy = jest.spyOn(UserSchema_1.default, 'findOne');
        // userSpy.mockReturnValue();
        console.log(typeof UserSchema_1.default);
        const response = userauthcontroller_1.default.route('/register').post(mockRequest, mockResponse);
        (0, globals_1.expect)(mockResponse.send).toEqual('hello world!');
    });
});
//# sourceMappingURL=userauthcontroller.test.js.map