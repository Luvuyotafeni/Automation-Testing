class TokenManager {

    static token = '';

    static setToken(token) {
        this.token = token;
    }

    static getToken() {
        return this.token;
    }
}

module.exports = TokenManager;