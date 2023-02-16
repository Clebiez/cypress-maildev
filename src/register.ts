import { MaildevCommands } from "./maildevCommands";

export const register = (cypress: Cypress.Cypress) => {
  const maildevCommands = new MaildevCommands();

  MaildevCommands.cypressCommands.forEach((commandName) => {
    cypress.Commands.add(
      commandName as any,
      // TS is not able to handle this trick, because it's a dirty trick !
      // @ts-ignore
      maildevCommands[commandName].bind(maildevCommands)
    );
  });
};
