const TokenManager = require('./tokenManager');

async function login(request, email, password) {

    const response = await request.post('/api/auth/login', {
        data: {
            email,
            password
        }
    });

    const responseBody = await response.json();

    TokenManager.setToken(responseBody.token);

    return response;
}

module.exports = {
    login
};