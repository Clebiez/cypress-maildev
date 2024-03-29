const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    MAILDEV_PROTOCOL: "http",
    MAILDEV_HOST: "127.0.0.1",
    MAILDEV_SMTP_PORT: "1025",
    MAILDEV_API_PORT: "1080",
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {},
  },
});
