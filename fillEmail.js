const nodemailer = require("nodemailer");
console.log(process.argv);
const transporter = nodemailer.createTransport({
  host: process.argv[2] || 'localhost',
  port: process.argv[3] || 1025,
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
    subject: "Your OTP code",
    text: "Your OTP code is : 012345 please don't share it !",
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

const sendEmailsRecursive = (i = 0) => {
  transporter.sendMail(emails[i], function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      if (i < emails.length - 1) {
        sendEmailsRecursive(i + 1);
      }
    }
  });
};

sendEmailsRecursive();