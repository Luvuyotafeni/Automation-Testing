const { test, expect } = require('@playwright/test');

const { login } = require('../../helpers/authHelper');

const { authHeaders } = require('../../helpers/apiHelper');

test.describe('Admin API Tests', () => {

    test.beforeAll(async ({ request }) => {

        await login(
            request,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASSWORD
        );
    });

    test('@Positive Get All Users', async ({ request }) => {

        const response = await request.get(
            '/api/admin/users',
            {
                headers: authHeaders()
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(Array.isArray(body)).toBeTruthy();
    });

    test('@Negative Unauthorized Delete', async ({ request }) => {

        const response = await request.delete(
            '/api/admin/users/99999'
        );

        expect(response.status()).toBe(403);
    });
});