const MaildevCommands = require("./maildevCommands");

const register = (Cypress) => {
  const maildevCommands = new MaildevCommands();
  MaildevCommands.cypressCommands.forEach((commandName) => {
    Cypress.Commands.add(
      commandName,
      maildevCommands[commandName].bind(maildevCommands)
    );
  });
};

module.exports = {
  register,
};