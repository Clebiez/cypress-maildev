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

  buildOptions(method: Method, path: string) {
    return {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        Accept: this.headers.Accept,
      },
      body: {},
    };
  }

  request(method: Method, path: string, body?: any) {
    const options = this.buildOptions(method, path);
    options.body = body || undefined;
    return cy.request(options).its("body");
  }

  get(path: string) {
    return this.request("GET", path);
  }

  post(path: string, body: object) {
    return this.request("POST", path, body);
  }

  put(path: string, body: object) {
    return this.request("PUT", path, body);
  }

  delete(path: string) {
    return this.request("DELETE", path);
  }
}

module.exports = Request;
