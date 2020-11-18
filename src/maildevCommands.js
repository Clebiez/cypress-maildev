/* global Cypress */

const Request = require("./request");

class MaildevCommands {
  static get cypressCommands() {
    return [
      "maildevGetAllMessages",
      "maildevGetLastMessage",
      "maildevGetMessageById",
      "maildevVisitMessageById",
      "maildevGetMessageBySubject",
      "maildevGetMessageBySentTo",
      "maildevDeleteMessageById",
      "maildevGetOTPCode",
      "maildevDeleteAllMessages",
      "maildevHealthcheck",
    ];
  }

  constructor() {
    this.baseUrl = `${Cypress.env("MAILDEV_PROTOCOL")}://${Cypress.env(
      "MAILDEV_HOST"
    )}`;

    if (Cypress.env("MAILDEV_API_PORT")) {
      this.baseUrl += `:${Cypress.env("MAILDEV_API_PORT")}`;
    }

    this.request = new Request({
      baseUrl: this.baseUrl,
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

  maildevVisitMessageById(id) {
    cy.visit(`${this.baseUrl}/email/${id}/html`);
  }

  maildevGetMessageBySubject(string) {
    return this.maildevGetAllMessages().then((emails) => {
      return emails.reverse().find((email) => email.subject === string) || null;
    });
  }

  maildevGetMessageBySentTo(address) {
    return this.maildevGetAllMessages().then((messages) => {
      const reversedMessages = messages.reverse();
      for (const message of reversedMessages) {
        for (const to of message.to) {
          if (to.address === address) {
            return message;
          }
        }
      }
      return null;
    });
  }

  maildevDeleteMessageById(id) {
    return this.request.delete(`/email/${id}`);
  }

  maildevGetOTPCode(string, digits = 6) {
    const OTP_REGEXP = new RegExp("\\d{" + digits + "}");
    const res = string.match(OTP_REGEXP);
    return res ? res[0] : null;
  }

  maildevDeleteAllMessages() {
    return this.request.delete("/email/all");
  }

  maildevHealthcheck() {
    return this.request.get("/healthz");
  }
}

module.exports = MaildevCommands;
