const { expect } = require('@playwright/test');

const { login } = require('./authHelper');

const { authHeaders } = require('./apiHelper');

async function deleteAllUsers(request) {

    // Login as admin
    await login(
        request,
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
    );

    // Get all users
    const usersResponse = await request.get(
        '/api/admin/users',
        {
            headers: authHeaders()
        }
    );

    expect(usersResponse.status()).toBe(200);

    const users = await usersResponse.json();

    // Filter ROLE_USER users
    const normalUsers = users.filter(
        user => user.role === 'ROLE_USER'
    );

    // Delete users one by one
    for (const user of normalUsers) {

        const deleteResponse = await request.delete(
            `/api/admin/users/${user.id}`,
            {
                headers: authHeaders()
            }
        );

        expect(deleteResponse.status()).toBe(200);

        console.log(`Deleted user ${user.email}`);
    }
}

module.exports = {
    deleteAllUsers
};