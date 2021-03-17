# Cypress Maildev

Cypress Maildev is a bunch of Cypress commands in order to test your messages (SMS and Emails) by using [Maildev REST API](https://github.com/maildev/maildev/blob/master/docs/rest.md).

![CI](https://github.com/Clebiez/cypress-maildev/workflows/CI/badge.svg?branch=main) [![npm version](https://badge.fury.io/js/cypress-maildev.svg)](https://badge.fury.io/js/cypress-maildev)

## Installation

```bash
npm install cypress-maildev --save-dev
yarn add cypress-maildev --dev
```

## Usage

### 1. Register the plugin :

```JavaScript
// cypress/support/index.js

require('cypress-maildev');
```

### 2. Specify your maildev address

> By default, Maildev API is started at the `http://localhost:1080`. So if you choose to don't use another host, you have nothing to do.

You can also use env vars in your `cypress.json` as below :

```json
// cypress/cypress.json

{
  "env": {
    "MAILDEV_PROTOCOL": "http",
    "MAILDEV_HOST": "localhost",
    "MAILDEV_SMTP_PORT": "1025",
    "MAILDEV_API_PORT": "1080"
  }
}
```

> For how response's body should be, please refer to [Maildev REST API documentation](https://github.com/maildev/maildev/blob/master/docs/rest.md)

## Commands

### Usage

> All of theses commands use directly `cy.request()` which return a Cypress Promise like. Check [the doc](https://docs.cypress.io/api/commands/request.html) !

Using one of this commands must be like this example :

```JavaScript
  cy.maildevGetLastMessage().then((email) => {
    expect(email.subject).to.equal("I'm the last email sent !");
  });
```

For more examples you can check directly the [file test](./cypress/integration/maildev.spec.js).

### Documentation

Get all messages received in the Maildev instance.

```JavaScript
cy.maildevGetAllMessages()
```

---

Get the last message received.

```JavaScript
cy.maildevGetLastMessage()
```

---

Each message got an internal ID. If you know it, you can find it directly.

```JavaScript
cy.maildevGetMessageById(id: String)
```

---

You can also directly access to the HTML of your email by calling.

```JavaScript
cy.maildevVisitMessageById(id: String)
```

And you can simply use Cypress promise to manipulate or assert the DOM of you email :

```JavaScript
  cy.maildevVisitMessageById(id: String);
  cy.get('body h1').should('have.text', 'Email incoming !');
  cy.get('body a').should('exist').and('have.text', 'click on this link');
```

> You must have to specify `"chromeWebSecurity": false,` because you will access to another domain than your app.
> Unfortunately, Cypress can't deactivate the cross-origin requests for Firefox actually.

---

Get all messages and find one by containing a specific subject.
We use a simple string detection case-sensitive.

```JavaScript
cy.maildevGetMessageBySubject(subject: String)
```

---

Get all messages and find the last containing a sent to address.
Use a strict string comparison.

```JavaScript
cy.maildevGetMessageBySentTo()
```

---

Delete a message by giving the ID. In can be useful if you to only keep message that you haven't read yet.

```JavaScript
cy.maildevDeleteMessageById()
```

---

Delete all message in order to flush your mailbox !

```JavaScript
cy.maildevDeleteAllMessages()
```

---

Get an OTP code from a string.
It can be used **outside of maildev box** because it doesn't use maildev API but generrally OTP code are sent by messages.
This function find in a string a specific amount of digits (default 6).


```JavaScript
cy.maildevGetOTPCode(string, digits = 6)
```

Or use with another maildev command

```JavaScript
  cy.maildevGetMessageBySubject("Your code").then(message => {
    cy.maildevGetOTPCode(message.text).then(code => {
      // Do something with the code
    });
  });
```

---

Simple test command that return true if Maildev is opened.

```JavaScript 
cy.maildevHealthcheck()
```

## Tests

Don't forget to start maildev.
You can use the little node script inside the `tests` folder in order to send multiple mails inside your maildev instance.

Before starting e2e tests, we will execute `fillEmail.js` script automatically in order to add a some default emails for testing our commands.

You can now run at the root `npm run test`.

> You can also mount and execute commands with the docker-compose.yml. `docker-compose build && docker-compose run cypress`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
