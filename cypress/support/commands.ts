Cypress.Commands.add("fillMaildev", () => {
  return cy.maildevDeleteAllMessages().then(() => {
    return cy.task("fillEmail", {
      host: Cypress.expose("MAILDEV_HOST"),
      port: Cypress.expose("MAILDEV_SMTP_PORT"),
    });
  });
});
