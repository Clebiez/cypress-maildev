/* global cy */

export interface RequestConstructorParams {
  baseUrl: string;
}

export type Method = "POST" | "GET" | "PUT" | "DELETE";

export default class Request {
  public baseUrl: string;
  public headers: {
    [key: string]: string;
  };

  constructor({ baseUrl }: RequestConstructorParams) {
    this.baseUrl = baseUrl || "http://localhost:1080";
    this.headers = {
      Accept: "application/json",
    };
  }

  buildOptions(method: Method, path: string): Partial<Cypress.RequestOptions> {
    return {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        Accept: this.headers.Accept,
      },
      body: {},
    };
  }

  request<T>(
    method: Method,
    path: string,
    body?: Pick<Cypress.RequestOptions, "body">,
  ): Cypress.Chainable<T> {
    const options = this.buildOptions(method, path);
    options.body = body || undefined;
    return cy.request(options).its("body");
  }

  get<T>(path: string) {
    return this.request<T>("GET", path);
  }

  post<T>(path: string, body: Pick<Cypress.RequestOptions, "body">) {
    return this.request<T>("POST", path, body);
  }

  put<T>(path: string, body: Pick<Cypress.RequestOptions, "body">) {
    return this.request<T>("PUT", path, body);
  }

  delete<T>(path: string) {
    return this.request<T>("DELETE", path);
  }
}

module.exports = Request;
