import verifyJWT from '../../src/util/verifyJWT';
import { NextFunction, Request, Response } from 'express';
import {describe, expect, test} from '@jest/globals';

describe('JWT Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
        };
    });

    test('without headers', async () => {
        mockResponse.status = function(responseStatus) {
            return this; 
        }

        const expectedResponse = {
            message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false
        };
        verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.send).toBeCalledWith(expectedResponse);
    });

    test('without x-access-token headers', async () => {
        mockResponse.status = function(responseStatus) {
            return this; 
        }

        const expectedResponse = {
            message: "Missing JWT token from the 'x-access-token' header", isLoggedIn: false
        };

        mockRequest = {
            headers: {
            }
        }

        verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.send).toBeCalledWith(expectedResponse);
    });

    // test('with x-access-token headers', async () => {

    //     mockRequest = {
    //         headers: {
    //             'x-access-token': 'Bearer abc'
    //         }
    //     }

    //     jest.mock('jwt', ()=> jest.fn);

    //     verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

    //     expect(nextFunction).toBeCalledTimes(1);
    // });

});