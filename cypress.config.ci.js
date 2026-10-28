const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  expose: {
    MAILDEV_PROTOCOL: "http",
    MAILDEV_HOST: "localhost",
    MAILDEV_SMTP_PORT: "1025",
    MAILDEV_API_PORT: "1080",
  },
  e2e: {
    setupNodeEvents(on) {
      on("task", require("./cypress/tasks"));
    },
  },
});
