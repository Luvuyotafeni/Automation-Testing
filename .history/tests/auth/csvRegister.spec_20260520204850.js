const { test, expect } = require('@playwright/test');

const { readCSV } = require('../../helpers/csvHelper');

test.describe('CSV Register Tests', () => {

    let users;

    test.beforeAll(async () => {

        users = await readCSV('tests/data/users.csv');
    });

    test('Register CSV Users @Positive', async ({ request }) => {

        for (const user of users) {

            const response = await request.post(
                '/api/auth/register',
                {
                    data: user
                }
            );

            expect(response.status()).toBe(200);

            const body = await response.json();

            expect(body).toHaveProperty('message');
        }
    });
});