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
const stockwatchlistcontroller_1 = __importDefault(require("../../src/routes/stockwatchlistcontroller"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('Test Stock Controller', function () {
    const emptyFunction = () => { };
    (0, globals_1.test)('responds to /', () => __awaiter(this, void 0, void 0, function* () {
        const req = {};
        const res = { text: '',
            send: function (input) { this.text = input; }
        };
        yield stockwatchlistcontroller_1.default.route('/deleteStock').post(emptyFunction, req, res);
        // expect(res.text).toEqual('hello world!');
    }));
    (0, globals_1.test)('responds to ', () => __awaiter(this, void 0, void 0, function* () {
        const req = { params: { name: 'Bob' } };
        const res = { text: '',
            send: function (input) { this.text = input; }
        };
        yield stockwatchlistcontroller_1.default.route('/deleteStock').post(emptyFunction, req, res);
        // expect(res.text).toEqual('hello Bob!');
    }));
});
//# sourceMappingURL=stockwatchlistcontroller.test.js.map