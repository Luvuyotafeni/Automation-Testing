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

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('message');
    });

    test('@Negative Register Existing User', async ({ request }) => {

        const response = await request.post('/api/auth/register', {
            data: {
                fullName: 'Luvuyo',
                email: 'luvuyo@gmail.com',
                password: 'Password123'
            }
        });

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toContain('already');
    });

    for (const user of users) {

        test(`@Positive Register JSON User ${user.email}`, async ({ request }) => {

            const response = await request.post('/api/auth/register', {
                data: user
            });

            expect(response.status()).toBe(200);

            const body = await response.json();

            expect(body).toHaveProperty('message');
        });
    }
});