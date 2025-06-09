const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    // retries: {
    //   runMode: 3,
    //   openMode: 2,
    // },
    // viewportHeight: 400,
    // viewportWidth: 400,
    video: true,
    projectId: "vhjes7",
  },
  env: {
    AUTH_USERNAME: 'guest',
    AUTH_PASSWORD: 'welcome2qauto',
    TEST_USER_EMAIL: 'michael.krasnovskyi+testUser1@gmail.com',
    TEST_USER_PASSWORD: 'ZSgeVQhuU3qkvlG',
  }
});
