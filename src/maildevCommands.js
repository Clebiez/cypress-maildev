/* global Cypress */

const Request = require("./request");

class MaildevCommands {
  static get cypressCommands() {
    return [
      "maildevGetAllMessages",
      "maildevGetLastMessage",
      "maildevGetMessageById",
      "maildevGetMessageBySubject",
      "maildevGetMessageBySentTo",
      "maildevDeleteMessageById",
      "maildevDeleteAllMessages",
      "maildevHealthcheck",
    ];
  }

  constructor() {
    const baseUrl = `http://${Cypress.env("MAILDEV_HOST")}:${Cypress.env(
      "MAILDEV_API_PORT"
    )}`;

    this.request = new Request({
      baseUrl,
    });
  }

  maildevGetAllMessages() {
    return this.request.get("/email");
  }

  maildevGetLastMessage() {
    return this.maildevGetAllMessages().then((emails) => {
      return emails[emails.length - 1];
    });
  }

  maildevGetMessageById(id) {
    return this.request.get(`/email/${id}`);
  }

  maildevGetMessageBySubject(string) {
    return this.maildevGetAllMessages().then((emails) => {
      return emails.find((email) => email.subject === string);
    });
  }

  maildevGetMessageBySentTo(address) {
    return this.maildevGetAllMessages().then((emails) => {
      return emails.reverse().find((email) => {
        return !!email.to.find((to) => {
          return to.address === address;
        });
      });
    });
  }

  maildevDeleteMessageById(id) {
    return this.request.delete(`/email/${id}`);
  }

  maildevDeleteAllMessages() {
    return this.request.delete("/email/all");
  }

  maildevHealthcheck() {
    return this.request.get("/healthz");
  }
}

module.exports = MaildevCommands;
