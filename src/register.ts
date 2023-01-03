/// <reference types="./">
import { MaildevCommands } from "./maildevCommands";
export const register = (cypress: Cypress.Cypress) => {
  const maildevCommands = new MaildevCommands();

  MaildevCommands.cypressCommands.forEach((commandName) => {
    cypress.Commands.add(
      commandName as any,
      (maildevCommands[commandName] as any).bind(maildevCommands)
    );
  });
};
