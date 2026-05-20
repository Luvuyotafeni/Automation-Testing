const TokenManager = require('./tokenManager');

function authHeaders() {

    return {
        Authorization: `Bearer ${TokenManager.getToken()}`
    };
}

module.exports = {
    authHeaders
};