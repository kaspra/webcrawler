const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://google.com/path": 1,
    "https://google.com/3": 3,
    "https://google.com/2": 2,
    "https://google.com/5": 5,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://google.com/5", 5],
    ["https://google.com/3", 3],
    ["https://google.com/2", 2],
    ["https://google.com/path", 1],
  ];
  expect(actual).toEqual(expected);
});
