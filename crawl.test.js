const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

// ------------- Normalize URL -------------

test("normalizeURL protocol", () => {
  const input = "https://blog.google.com/path";
  const actual = normalizeURL(input);
  const expected = "blog.google.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL slash", () => {
  const input = "https://blog.google.com/path/";
  const actual = normalizeURL(input);
  const expected = "blog.google.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.google.com/path/";
  const actual = normalizeURL(input);
  const expected = "blog.google.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
  const input = "http://BLOG.google.com/path/";
  const actual = normalizeURL(input);
  const expected = "blog.google.com/path";

  expect(actual).toEqual(expected);
});

// ------------------------------------------------

// ------------- Get URL From HTML -------------

test("getURLsFromHTML absolute", () => {
  const URLBody = `
    <html>
      <body>
        <a href="https://blog.google.com/">
          <span>google.com</span>
        </a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.google.com";

  const actual = getURLsFromHTML(URLBody, baseURL);
  const expected = ["https://blog.google.com/"];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const URLBody = `
    <html>
      <body>
        <a href="/path/">
          <span>google.com</span>
        </a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.google.com";

  const actual = getURLsFromHTML(URLBody, baseURL);
  const expected = ["https://blog.google.com/path/"];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const URLBody = `
    <html>
      <body>
        <a href="https://blog.google.com/path/">
          <span>google.com</span>
        </a>
        <a href="/path/one/">
          <span>google.com</span>
        </a>
        <a href="https://blog.google.com">
          <span>google.com</span>
        </a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.google.com";

  const actual = getURLsFromHTML(URLBody, baseURL);
  const expected = [
    "https://blog.google.com/path/",
    "https://blog.google.com/path/one/",
    "https://blog.google.com/",
  ];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid url", () => {
  const URLBody = `
    <html>
      <body>
        <a href="invalid">
          <span>google.com</span>
        </a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.google.com";

  const actual = getURLsFromHTML(URLBody, baseURL);
  const expected = [];

  expect(actual).toEqual(expected);
});

// ------------------------------------------------
