import { MaildevCommands } from "./maildevCommands";

export const register = (cypress: Cypress.Cypress) => {
  const maildevCommands = new MaildevCommands();

  for (const commandName of MaildevCommands.cypressCommands) {
    cypress.Commands.add(
      // biome-ignore lint/suspicious/noExplicitAny: The typing made by cypress is not ideal
      commandName as keyof Cypress.Chainable<any>,
      // @ts-expect-error
      maildevCommands[commandName].bind(maildevCommands),
    );
  }
};
