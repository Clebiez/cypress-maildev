const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    MAILDEV_PROTOCOL: "http",
    MAILDEV_HOST: "maildev",
    MAILDEV_SMTP_PORT: "25",
    MAILDEV_API_PORT: "80",
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {},
  },
});
