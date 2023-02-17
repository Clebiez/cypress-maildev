export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to populate maildev with dumb emails
       * @example cy.fillMaildev()
       */
      fillMaildev(): Chainable<any>;
    }
  }
}
