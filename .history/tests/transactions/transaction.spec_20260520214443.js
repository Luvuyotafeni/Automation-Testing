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
            '/api/transactions/deposit',
            {
                headers: authHeaders(),

                data: {
                    amount: 5000
                }
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.message).toContain('successful');

        expect(body.newBalance).toBeGreaterThan(0);
    });

    test('@Positive Withdraw Money', async ({ request }) => {

        const response = await request.post(
            '/api/transactions/withdraw',
            {
                headers: authHeaders(),

                data: {
                    amount: 500
                }
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.message).toContain('successful');
    });

    test('@Negative Withdraw Insufficient Funds', async ({ request }) => {

        const response = await request.post(
            '/api/transactions/withdraw',
            {
                headers: authHeaders(),

                data: {
                    amount: 999999
                }
            }
        );

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toContain('Insufficient');
    });

    test('@Positive Poll Transaction History', async ({ request }) => {

        await expect.poll(async () => {

            const response = await request.get(
                '/api/transactions',
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