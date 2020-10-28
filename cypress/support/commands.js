const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true,
});

const emails = [
  {
    from: "mailer@example.com",
    to: "firstemail@example.com",
    subject: "I'm the first email sent !",
    text: "I'm very happy to be here.",
  },
  {
    from: "mailer@example.com",
    to: "secondemail@example.com, anotheremail@example.com",
    subject: "I'm another email",
    html:
      "<html><body><h1>Email incoming !</h1><a href='#'>click on this link</a></body></html>",
  },
  {
    from: "mailer@example.com",
    to: "lastemail@example.com, anotheremail@example.com",
    subject: "I'm the last email sent !",
    text: "I'm very happy to be here.",
  },
];

Cypress.Commands.add("fillMaildev", () => {
  emails.forEach((email) => {
    transporter.sendMail(email, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
});
