import { Email } from "./types/Email";
import { register } from "./register";

register(Cypress);
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Command to get all messages received inside Maildev.
       * @example cy.maildevGetAllMessages()
       */
      maildevGetAllMessages(): Cypress.Chainable<Email[]>;

      /**
       * Command to get the last message received inside Maildev.
       * @example cy.maildevGetAllMessages()
       */
      maildevGetLastMessage(): Cypress.Chainable<Email>;

      /**
       * Command to get a message by its subject.
       * @example cy.maildevGetMessageBySubject("My subject")
       */
      maildevGetMessageBySubject(subject: string): Cypress.Chainable<Email>;

      /**
       * Command to get a message by its Maildev ID.
       * @example cy.maildevGetMessageById("MESSAGE_ID")
       */
      maildevGetMessageById(id: string): Cypress.Chainable<Email>;

      /**
       * Command to get a message sent to an email.
       * @example cy.maildevGetMessageBySentTo("john.do@example.com")
       */
      maildevGetMessageBySentTo(email: string): Cypress.Chainable<Email>;

      /**
       * Command to visit Maildev frontend app directly to the view of an email by using his Maildev ID.
       * And you can use Cypress promise to manipulate or assert the DOM of your email :
       * @example  cy.maildevVisitMessageById(id: String);
        cy.get('body h1').should('have.text', 'Email incoming !');
        cy.get('body a').should('exist').and('have.text', 'click on this link');
       */
      maildevVisitMessageById(id: string): void;

      /**
       * From a string, extract a OTP code pattern
       * @example cy.maildevGetAllMessages("my code is 123456", 6) => '123456'
       */
      maildevGetOTPCode(
        str: string,
        digits: number
      ): Cypress.Chainable<string | null>;

      /**
       * Command to delete a message by his Maildev ID.
       * @example cy.maildevGetAllMessages()
       */
      maildevDeleteMessageById(id: string): Cypress.Chainable<any>;

      /**
       * Command to delete a message by its Maildev ID.
       * @example cy.maildevGetAllMessages()
       */
      maildevDeleteAllMessages(): Cypress.Chainable<any>;

      /**
       * Command to check if Maildev is available, for debug purpose.
       * @example cy.maildevGetAllMessages()
       */
      maildevHealthcheck(): Cypress.Chainable<any>;
    }
  }
}
