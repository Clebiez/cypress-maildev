Cypress.Commands.add("fillMaildev", () => {
  return cy.maildevDeleteAllMessages().then(() => {
    return cy.exec(
      `npm run fillEmail --host ${Cypress.env(
        "MAILDEV_HOST",
      )} --port ${Cypress.env("MAILDEV_SMTP_PORT")}`,
    );
  });
});
