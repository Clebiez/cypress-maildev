describe("Maildev recipes", () => {
  before(() => {
    cy.maildevDeleteAllMessages().then(() => {
      cy.exec(
        `npm run fillEmail --host ${Cypress.env(
          "MAILDEV_HOST"
        )} --port ${Cypress.env("MAILDEV_SMTP_PORT")}`
      );
    });
  });

  describe("maildevGetAllMessages", () => {
    it("Should get all emails and counting 3.", () => {
      cy.maildevGetAllMessages().then((emails) => {
        expect(emails.length).to.equal(3);
      });
    });
  });

  describe("maildevGetLastMessage", () => {
    it("Should get the last message received.", () => {
      cy.maildevGetLastMessage().then((email) => {
        expect(email.subject).to.equal("I'm the last email sent !");
      });
    });
  });

  describe("maildevGetMessageById", () => {
    it("Should get an email based on the ID", () => {
      cy.maildevGetAllMessages().then((emails) => {
        cy.maildevGetMessageById(emails[2].id).then((email) => {
          expect(email.subject).to.equal("I'm the last email sent !");
        });
      });
    });
  });

  describe("maildevGetMessageBySubject", () => {
    it("Should find a message by the subject.", () => {
      cy.maildevGetMessageBySubject("I'm another email").then((email) => {
        expect(email.subject).to.equal("I'm another email");
      });
    });
  });

  describe("maildevGetMessageBySentTo", () => {
    it("Should find a message by a sent to address.", () => {
      cy.maildevGetMessageBySentTo("secondemail@example.com").then((email) => {
        expect(email.subject).to.equal("I'm another email");
      });
    });

    it("Should find the last message by a sent to address.", () => {
      cy.maildevGetMessageBySentTo("anotheremail@example.com").then((email) => {
        expect(email.subject).to.equal("I'm the last email sent !");
      });
    });
  });

  describe("maildevDeleteMessageById", () => {
    it("Should delete a specific email by Id", () => {
      cy.maildevGetAllMessages().then((emails) => {
        cy.maildevDeleteMessageById(emails[0].id);
        cy.maildevGetAllMessages().then((emails) => {
          expect(emails.length).to.equal(2);
        });
      });
    });
  });

  describe("maildevDeleteAllMessages", () => {
    it("Should delete all emails", () => {
      cy.maildevDeleteAllMessages();
      cy.maildevGetAllMessages().then((emails) => {
        expect(emails.length).to.equal(0);
      });
    });
  });

  describe("maildevHealthcheck", () => {
    it("Should return true if maildev is turned on", () => {
      cy.maildevHealthcheck().then((res) => {
        expect(res).to.equal(true);
      });
    });
  });
});
