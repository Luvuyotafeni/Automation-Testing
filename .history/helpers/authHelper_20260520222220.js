const { expect } = require('@playwright/test');
const TokenManager = require('./tokenManager');

async function login(request, email, password) {

    const response = await request.post('/api/auth/login', {
        data: {
            email,
            password
        }
    });

    console.log('LOGIN STATUS:', response.status());

    const responseText = await response.text();

    console.log('LOGIN RESPONSE:', responseText);

    expect(response.ok()).toBeTruthy();

    const responseBody = JSON.parse(responseText);

    TokenManager.setToken(responseBody.token);

    return response;
}

module.exports = { login };