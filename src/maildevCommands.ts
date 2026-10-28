/* global Cypress */
import Request from "./request";
import type { Email } from "./types/Email";

export class MaildevCommands {
  public baseUrl: string;
  public apiPath: string;
  public request: Request;

  static get cypressCommands(): string[] {
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
    this.baseUrl = `${Cypress.expose("MAILDEV_PROTOCOL")}://${Cypress.expose(
      "MAILDEV_HOST",
    )}`;

    if (Cypress.expose("MAILDEV_API_PORT")) {
      this.baseUrl += `:${Cypress.expose("MAILDEV_API_PORT")}`;
    }

    this.apiPath = Cypress.expose("MAILDEV_VERSION_2") ? "" : "/api";

    this.request = new Request({
      baseUrl: `${this.baseUrl}${this.apiPath}`,
    });
  }

  maildevGetAllMessages(): Cypress.Chainable<Email[]> {
    return this.request.get<Email[]>("/email");
  }

  maildevGetLastMessage(): Cypress.Chainable<Email> {
    return this.maildevGetAllMessages().then((emails) => {
      return emails[emails.length - 1];
    });
  }

  maildevGetMessageById(id: string): Cypress.Chainable<Email> {
    return this.request.get<Email>(`/email/${id}`);
  }

  maildevVisitMessageById(id: string): void {
    const { baseUrl, apiPath } = this;
    cy.origin(baseUrl, { args: { id, apiPath } }, ({ id, apiPath }) => {
      cy.visit(`${apiPath}/email/${id}/html`);
    });
  }

  maildevGetMessageBySubject(str: string): Cypress.Chainable<Email> {
    return this.maildevGetAllMessages().then((emails) => {
      return emails.find((email: Email) => email.subject === str) ?? null;
    }) as Cypress.Chainable<Email>;
  }

  maildevGetMessageBySentTo(address: string): Cypress.Chainable<Email | null> {
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
    }) as Cypress.Chainable<Email | null>;
  }

  maildevDeleteMessageById(id: string): Cypress.Chainable<boolean> {
    return this.request.delete<boolean>(`/email/${id}`);
  }

  maildevGetOTPCode(str: string, digits = 6): Cypress.Chainable<string | null> {
    const OTP_REGEXP = new RegExp(`\\d{${digits}}`);
    const res = str.match(OTP_REGEXP);
    return cy.wrap(res ? res[0] : null);
  }

  maildevDeleteAllMessages(): Cypress.Chainable<boolean> {
    return this.request.delete<boolean>("/email/all");
  }

  maildevHealthcheck(): Cypress.Chainable<string> {
    return this.request.get<string>("/healthz");
  }
}
