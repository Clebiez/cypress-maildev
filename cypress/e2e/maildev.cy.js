describe("Maildev recipes", () => {
  before(() => {
    cy.fillMaildev();
  });

  describe("maildevGetAllMessages", () => {
    it("Should get all emails and counting 3.", () => {
      cy.maildevGetAllMessages().then((emails) => {
        expect(emails.length).to.equal(4);
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
        cy.maildevGetMessageById(emails[3].id).then((email) => {
          expect(email.subject).to.equal("I'm the last email sent !");
        });
      });
    });
  });

  describe("maildevVisitMessageById", () => {
    it("Should display maildev webapp with message", () => {
      cy.maildevGetAllMessages().then((emails) => {
        cy.maildevVisitMessageById(emails[2].id);
        cy.get("body h1").should("have.text", "Email incoming !");
        cy.get("body a").should("exist").and("have.text", "click on this link");
      });
    });
  });

  describe("maildevGetMessageBySubject", () => {
    it("Should find a message by the subject.", () => {
      cy.maildevGetMessageBySubject("I'm another email").then((email) => {
        expect(email.subject).to.equal("I'm another email");
      });
    });

    it("Should return null by trying to find a message by the subject.", () => {
      cy.maildevGetMessageBySubject("Unknown subject").then((email) => {
        expect(email).to.equal(null);
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

    it("Should return null because e-mail has never been used", () => {
      cy.maildevGetMessageBySentTo("notexist@example.com").then((email) => {
        expect(email).to.be.equal(null);
      });
    });
  });

  describe("maildevDeleteMessageById", () => {
    it("Should delete a specific email by Id", () => {
      cy.maildevGetAllMessages().then((emails) => {
        cy.maildevDeleteMessageById(emails[0].id);
        cy.maildevGetAllMessages().then((emails) => {
          expect(emails.length).to.equal(3);
        });
      });
    });
  });

  describe("maildevGetOTPCode", () => {
    it("Should return the OTP code", () => {
      cy.maildevGetOTPCode(
        "Hi, your OTP code is 012345, please do not share it"
      ).then((code) => {
        expect(code).to.equal("012345");
      });
    });

    it("Should return the OTP code with 8 digits", () => {
      cy.maildevGetOTPCode(
        "Hi, your OTP code is 01234567, please do not share it",
        8
      ).then((code) => {
        expect(code).to.equal("01234567");
      });
    });

    it("Should return null if no OTP code exist", () => {
      cy.maildevGetOTPCode(
        "Hi, your OTP code is 012345, please do not share it",
        8
      ).then((code) => {
        expect(code).to.equal(null);
      });
    });

    it("Should get OTP code from a message", () => {
      cy.maildevGetMessageBySubject("Your OTP code").then((message) => {
        cy.log(message);
        cy.maildevGetOTPCode(message.text).then((code) => {
          expect(code).to.equal("012345");
        });
      });
    });
  });

  describe("maildevDeleteAllMessages", () => {
    it("Should delete all emails", () => {
      cy.maildevDeleteAllMessages();
      cy.maildevGetAllMessages().then((emails) => {
        expect(emails.length).to.equal(0);
        cy.fillMaildev(); // refill your mailbox
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
