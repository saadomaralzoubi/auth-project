'use strict';
process.env.SECRET = "BURGER" || process.env.SECRET
const supertest = require('supertest');
const { app } = require('../src/server');
const { db } = require('../src/models/index');
const mockRequest = supertest(app);
let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    user: { username: 'user', password: 'password', role: 'user' }
};
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('Authenticated routes test', () => {
    Object.keys(users).forEach(userRole => {
        describe(`${userRole} users`, () => {
            it('create new record', async () => {
                const register = await mockRequest.post('/signup').send(users[userRole]);
                const token = register.body.token;
                const response = await mockRequest.post('/food').send({
                    "name": "pizza",
                    "price": "236",
                    "category": "italian"
                }).set("Authorization", `Bearer ${token}`);
                if (userRole === 'user') {
                    expect(response.status).not.toBe(201);
                } else {
                    expect(response.status).toBe(201);
                }
            });
            it('get all records', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                await mockRequest.put('/api/v2/movies').send({
                    "name": "anything",
                    "price": "1323",
                    "category": "anythin"
                }).set('Authorization', `Bearer admin`);
                const response = await mockRequest.get('/food').set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
            });
            it('get one food', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.get('/food/1').set('Authorization', `Bearer ${token}`);
                if (userRole === 'admin') {
                expect(response.status).toBe(200);}
            
            });
            it('update record', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.put('/food/1').send({
                    "name": "dssdsd",
                    "price": "111222",
                    "category": "asas"
                }).set('Authorization', `Bearer ${token}`);
                if (users[userRole].role === 'admin') {
                    expect(response.status).toBe(201);
                } 
            });
            if ('delete user', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.delete('/users/1').set('Authorization', `Bearer ${token}`);
                if (users[userRole].role === 'admin') {
                    expect(response.status).toBe(204);
                } else {
                    expect(response.status).not.toBe(204);
                }
            });
        });
    });
});