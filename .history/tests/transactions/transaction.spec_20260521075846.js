const { test, expect } = require('@playwright/test');

const { login } = require('../../helpers/authHelper');

const { authHeaders } = require('../../helpers/apiHelper');

test.describe('Transaction API Tests', () => {

    test.beforeAll(async ({ request }) => {

        await login(
            request,
            process.env.USER_EMAIL,
            process.env.USER_PASSWORD
        );
    });

    test('@Positive Deposit Money', async ({ request }) => {

        const response = await request.post(
            '/api/user/transactions',
            {
                headers: authHeaders(),

                data: {
                    amount: 5000
                }
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('id');

        expect(body.amount).toBe(5000);

        expect(body.user.email).toBe(process.env.USER_EMAIL);
    });

    test('@Positive Poll Transaction History', async ({ request }) => {

        await expect.poll(async () => {

            const response = await request.get(
                '/api/user/transactions',
                {
                    headers: authHeaders()
                }
            );

            return response.status();

        }, {
            timeout: 10000,
            intervals: [1000, 2000]
        }).toBe(200);
    });
});