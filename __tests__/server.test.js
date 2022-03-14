'use strict';
const supertest = require('supertest');
const { app } = require('../src/server');
const mockRequest = supertest(app);
describe('Server Test', () => {
    it('server is running', async () => {
        const response = await mockRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('home');
    });
    it('bad method', async () => {
        const response = await mockRequest.get('/randompathadfaf');
        expect(response.status).toEqual(404);
    });
});