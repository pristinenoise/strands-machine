import {
  CommandHeader,
  isCommandHeader,
  parseCommandHeader,
} from "@App/script/parseCommandHeader";

test("it can test for whether a line of text is the command header", () => {
  const line = "% block name='xxx' id='abc'";
  expect(isCommandHeader(line)).toBe(true);
});

test("it strips leading spaces from a line of text when testing", () => {
  const line = "   % block name='xxx' id='abc'";
  expect(isCommandHeader(line)).toBe(true);
});

test("it can parse a command type with no attributes", () => {
  expect(parseCommandHeader("% block").type).toBe("block");
  expect(parseCommandHeader("%block").type).toBe("block");
  expect(parseCommandHeader("% block    ").type).toBe("block");
});

test("it can parse multiple attributes", () => {
  const line = "% block name='xxx' id='abc'";
  const res: CommandHeader = parseCommandHeader(line);
  expect(res.type).toBe("block");
  expect(res.params["name"]).toBe("xxx");
  expect(res.params["id"]).toBe("abc");
});

test("it errors with no command type given", () => {
  expect(() => parseCommandHeader("%")).toThrowError(/Invalid first line/);
  expect(() => parseCommandHeader("% ")).toThrowError(/Invalid first line/);
});
