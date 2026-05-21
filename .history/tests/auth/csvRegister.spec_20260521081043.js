const { test, expect } = require('@playwright/test');

const fs = require('fs');

const path = require('path');

const csv = require('csv-parser');

test.describe('CSV Register Tests', () => {

    test('Register CSV Users @Positive', async ({ request }) => {

        const users = [];

        await new Promise((resolve) => {

            fs.createReadStream(
                path.join(__dirname, '../data/users.csv')
            )
                .pipe(csv())
                .on('data', (data) => users.push(data))
                .on('end', resolve);
        });

        for (const user of users) {

            const response = await request.post(
                '/api/auth/register',
                {
                    data: {
                        fullName: user.fullName,
                        email: user.email,
                        password: user.password
                    }
                }
            );

            expect(response.status()).toBe(201);

            const body = await response.text();

            expect(body).toContain('User Registered');
        }
    });
});