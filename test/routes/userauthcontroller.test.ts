import userauthcontroller from '../../src/routes/userauthcontroller';
import { NextFunction, Request, Response } from 'express';
import User from '../../src/model/UserSchema';
import {describe, expect, test} from '@jest/globals';


describe('Test User Auth Controller', function () {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
        };
    });

    // test('responds to /login', () => {
    //     mockRequest = {
    //         body: {
    //             email: 'avw5331@gmail.com',
    //             password: 'password'
    //         }
    //     };

    //     const userSpy = jest.spyOn(User, 'findOne');
        
    //     // userSpy.mockReturnValue();

    //     // const response = userauthcontroller.route('/login').post(mockRequest, mockResponse);
        
    //     expect(mockResponse.send).toEqual('hello world!');
    // });

    test('responds to /register', () => {
        mockRequest = {
            body: {
                email: 'avw5331@gmail.com',
                password: 'password'
            }
        };

        mockResponse.status = function(responseStatus) {
            return this; 
        }

        const controllerToTest = new userauthcontroller();
        const user = new User();

        const userSpy = jest.spyOn(User, 'findOne');
        
        // userSpy.mockReturnValue();
        console.log(typeof User);

        const response = controllerToTest.route('/register').post(mockRequest, mockResponse);
        
        expect(mockResponse.send).toEqual('hello world!');
    });
});