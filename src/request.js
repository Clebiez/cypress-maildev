/* global cy */

class Request {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl || 'http://localhost:1080';
    this.headers = {
      Accept: "application/json",
    };
  }

  buildOptions(method, path) {
    return {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        Accept: this.headers.Accept,
      },
    };
  }

  request(method, path, body) {
    const options = this.buildOptions(method, path);
    options.body = body || undefined;
    return cy.request(options).its("body");
  }

  get(path) {
    return this.request("GET", path);
  }

  post(path, body) {
    return this.request("POST", path, body);
  }

  put(path, body) {
    return this.request("PUT", path, body);
  }

  delete(path) {
    return this.request("DELETE", path);
  }
}

module.exports = Request;
