// @ts-check

require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html'],
        ['list']
    ],

    use: {

        baseURL: process.env.BASE_URL,

        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        },

        trace: 'on-first-retry'
    }
});