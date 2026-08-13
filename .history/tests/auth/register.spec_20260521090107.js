const { test, expect } = require('@playwright/test');

const users = require('../data/users.json');

const { deleteAllUsers } = require('../../helpers/adminHelper');

test.describe('Register API Tests', () => {

    test.beforeAll(async ({ request }) => {

        // Clean database before registration tests
        await deleteAllUsers(request);

        console.log('All ROLE_USER users deleted');
    });

    test.beforeEach(async () => {

        console.log('Starting Register Test');
    });

    test.afterEach(async () => {

        console.log('Finished Register Test');
    });

    test('@Positive Register User Successfully', async ({ request }) => {

        const response = await request.post('/api/auth/register', {
            data: {
                fullName: 'Playwright User',
                email: `user${Date.now()}@gmail.com`,
                password: 'Password123'
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.text();

        expect(body).toContain('User Registered');
    });

    test('@Negative Register Existing User', async ({ request }) => {

        // Register user first
        await request.post('/api/auth/register', {
            data: {
                fullName: 'Luvuyo',
                email: 'luvuyo@gmail.com',
                password: 'Password123'
            }
        });

        // Attempt duplicate registration
        const response = await request.post('/api/auth/register', {
            data: {
                fullName: 'Luvuyo',
                email: 'luvuyo@gmail.com',
                password: 'Password123'
            }
        });

        expect(response.status()).toBe(403);

        const body = await response.text();

        expect(body).toContain('already');
    });

    // Data Driven Tests from JSON
    for (const user of users) {

        test(`@Positive Register JSON User ${user.email}`, async ({ request }) => {

            const uniqueUser = {
                ...user,
                email: `user${Date.now()}_${user.email}`
            };

            const response = await request.post('/api/auth/register', {
                data: uniqueUser
            });

            expect(response.status()).toBe(201);

            const body = await response.text();

            expect(body).toContain('User Registered');
        });
    }
});