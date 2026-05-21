const { expect } = require('@playwright/test');
const TokenManager = require('./tokenManager');

async function login(request, email, password) {

    const response = await request.post('/api/auth/login', {
        data: {
            email,
            password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    TokenManager.setToken(body.token);

    return response;
}

module.exports = { login };