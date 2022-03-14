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


Object.keys(users).forEach(userType => {
    describe(`${userType} users`, () => {
        it('create user', async () => {
            const response = await mockRequest.post('/signup').send(users[userType]);
            const userObject = response.body;
            expect(response.status).toBe(201);
            expect(userObject.token).toBeDefined();
            expect(userObject.user.id).toBeDefined();
            expect(userObject.user.username).toEqual(users[userType].username);
            expect(userObject.user.role).toEqual(users[userType].role);
        });

        it('signin basic auth', async () => {
            const response = await mockRequest.post('/signin').auth(users[userType].username, users[userType].password);
            const userObject = response.body;
            expect(response.status).toBe(200);
            expect(userObject.token).toBeDefined();
            expect(userObject.user.id).toBeDefined();
            expect(userObject.user.username).toEqual(users[userType].username);
            expect(userObject.user.role).toEqual(users[userType].role);
        });

        it('signin bearer auth', async () => {
            const response = await mockRequest.post('/signin').auth(users[userType].username, users[userType].password);
            const token = response.body.token;
            const bearerResponse = await mockRequest.get('/secretStuff').set('Authorization', `Bearer ${token}`)
            expect(bearerResponse.status).toBe(404);
        });
    });
});

describe('login errors', () => {
    it('signin with incorrect password', async () => {
        const response = await mockRequest.post('/signin').auth('admin', 'xyz')
        expect(response.status).toBe(403);
    });

    it('signin with invalid user', async () => {
        const response = await mockRequest.post('/signin').auth('anything', '12345')
        const userObject = response.body;
        expect(userObject.token).not.toBeDefined();
    });

    it('bearer invalid token', async () => {
        const bearerResponse = await mockRequest.get('/secret').set('Authorization', 'Bearer random token');
        expect(bearerResponse.status).not.toBe(200);
    });
});