const { expect } = require('@playwright/test');

const TokenManager = require('./tokenManager');

async function registerUser(request, email, password) {

    const response = await request.post('/api/auth/register', {
        data: {
            fullName: 'Automation User',
            email,
            password
        }
    });

    // Registration may fail if user already exists
    // That's okay for setup purposes

    return response;
}

async function login(request, email, password) {

    let response = await request.post('/api/auth/login', {
        data: {
            email,
            password
        }
    });

    // If user does not exist → create user
    if (response.status() === 403) {

        console.log('User not found. Registering user...');

        await registerUser(
            request,
            email,
            password
        );

        // Retry login
        response = await request.post('/api/auth/login', {
            data: {
                email,
                password
            }
        });
    }

    expect(response.status()).toBe(200);

    const body = await response.json();

    TokenManager.setToken(body.token);

    return response;
}

module.exports = {
    login
};