'use strict';
const supertest = require('supertest');
const { app } = require('../src/server');
const { db } = require('../src/models/index');
const mockRequest = supertest(app);
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});
describe('non authenticated routes', () => {
    it('add new record ', async () => {
        const response = await mockRequest.post('/food').send({
            "name": "dsd",
            "price": "senssdsdrita",
            "category": "fdfdfd"
        });
        expect(response.status).toBe(500);
    });

    it('get all records', async () => {
        const response = await mockRequest.get('/food');
        console.log("1111111111",response.status);
        expect(response.status).toBe(200);
    });


});