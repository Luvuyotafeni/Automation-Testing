let token = '';

function setToken(newToken) {
    token = newToken;
}

function getToken() {
    return token;
}

module.exports = {
    setToken,
    getToken
};