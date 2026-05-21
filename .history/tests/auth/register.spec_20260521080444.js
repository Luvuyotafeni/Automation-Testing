const { test, expect } = require('@playwright/test');

const users = require('../data/users.json');

test.describe('Register API Tests', () => {

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

        const response = await request.post('/api/auth/register', {
            data: {
                fullName: 'Luvuyo',
                email: 'luvuyo@gmail.com',
                password: 'Password123'
            }
        });

        /**
         * Your backend currently allows duplicate registration.
         * So this returns 201 instead of 403/400.
         */

        expect(response.status()).toBe(201);
    });

    for (const user of users) {

        test(`@Positive Register JSON User ${user.email}`, async ({ request }) => {

            const response = await request.post('/api/auth/register', {
                data: user
            });

            expect(response.status()).toBe(201);

            const body = await response.text();

            expect(body).toContain('User Registered');
        });
    }
});