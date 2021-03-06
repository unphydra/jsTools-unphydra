const assert = require("chai").assert;
const {
  generateCutMessage,
  getCutLines,
  parser
} = require("../src/optionLib");

describe("cut.js", () => {
  describe("generateCutMessage", () => {
    it("should give a string for the string in a list", () => {
      const actual = generateCutMessage(["abcde"]);
      const expected = "abcde";
      assert.deepStrictEqual(actual, expected);
    });

    it("should give nothing if nothing in the list", () => {
      const actual = generateCutMessage([]);
      const expected = "";
      assert.deepStrictEqual(actual, expected);
    });

    it("should give string for multiple string of list", () => {
      const actual = generateCutMessage(["abcde", "fghij", "klmno"]);
      const expected = "abcde\nfghij\nklmno";
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("getCutLines", () => {
    it("should give cut lines for list with tab deliminator and line does not has tab", () => {
      const instruction = { delim: "\t", fields: [2] };
      const actual = getCutLines(["a,b,c,d", "a,b,c,d"], instruction);
      const expected = ["a,b,c,d", "a,b,c,d"];
      assert.deepStrictEqual(actual, expected);
    });

    it("should give cut lines for list with tab deliminator and line has tab", () => {
      const instruction = { delim: "\t", fields: [2] };
      const actual = getCutLines(["a,b\tc,d", "a,b,c,d"], instruction);
      const expected = ["c,d", "a,b,c,d"];
      assert.deepStrictEqual(actual, expected);
    });

    it("should give empty cut lines for a field where no char in that line", () => {
      const instruction = { delim: ",", fields: [5] };
      const actual = getCutLines(["a,b,c,d", "a,b,c,d"], instruction);
      const expected = ["", ""];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("parser", () => {
    it("should filter the argument", () => {
      const args = ["node", "cut,js", "-d", ",", "-f", "2", "somePath"];
      const actual = parser(args);
      const expected = { delim: ",", fields: [2], path: "somePath" };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
