"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userauthcontroller_1 = __importDefault(require("../../src/routes/userauthcontroller"));
describe('Test User Auth Controller', function () {
    test('responds to /login', () => {
        const req = {
            body: {
                email: 'avw5331@gmail.com',
                password: 'anything'
            }
        };
        const res = { text: '',
            send: function (input) { this.text = input; }
        };
        const response = userauthcontroller_1.default.route('/login').post(req, res);
        expect(res.text).toEqual('hello world!');
    });
    test('responds to /register', () => {
        const req = { params: { name: 'Bob' } };
        const res = { text: '',
            send: function (input) { this.text = input; }
        };
        (0, userauthcontroller_1.default)(req, res);
        expect(res.text).toEqual('hello Bob!');
    });
});
//# sourceMappingURL=userauthcontroller.test.js.map