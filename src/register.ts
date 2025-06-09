import { MaildevCommands } from "./maildevCommands";

export const register = (cypress: Cypress.Cypress) => {
  const maildevCommands = new MaildevCommands();

  for (const commandName of MaildevCommands.cypressCommands) {
    cypress.Commands.add(
      // @ts-ignore The typing made by Cypress is not ideal
      // biome-ignore lint/suspicious/noExplicitAny: The typing made by Cypress is not ideal.
      commandName as keyof Cypress.Chainable<any>,
      // TS is not able to handle this trick, because it's a dirty trick !
      // @ts-ignore
      maildevCommands[commandName].bind(maildevCommands),
    );
  }
};
