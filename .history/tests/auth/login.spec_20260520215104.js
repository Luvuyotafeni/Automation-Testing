const { test, expect } = require('@playwright/test');

const { login } = require('../../helpers/authHelper');

const TokenManager = require('../../helpers/tokenManager');

test.describe('Login API Tests', () => {

    test('@Positive Login Successfully', async ({ request }) => {

        const response = await login(
            request,
            process.env.USER_EMAIL,
            process.env.USER_PASSWORD
        );

        expect(response.status()).toBeTruthy(200);

        const body = await response.json();

        expect(body).toHaveProperty('token');

        expect(body.token).not.toBeNull();

        console.log(TokenManager.getToken());
    });

    test('@Negative Invalid Login', async ({ request }) => {

        const response = await request.post('/api/auth/login', {
            data: {
                email: 'wrong@gmail.com',
                password: 'WrongPassword'
            }
        });

        expect(response.status()).toBe(401);

        const body = await response.json();

        expect(body.message).toContain('Invalid');
    });
});