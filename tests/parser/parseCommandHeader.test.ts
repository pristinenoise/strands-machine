import { parseCommandHeader } from "@App/parsers/parseCommandHeader";

test("it can parse a command type with no attributes", () => {
  expect(parseCommandHeader("% block").type).toBe("block");
  expect(parseCommandHeader("%block").type).toBe("block");
  expect(parseCommandHeader("% block    ").type).toBe("block");
});

test("it errors with no command type given", () => {
  expect(() => parseCommandHeader("%")).toThrowError(/Invalid first line/);
  expect(() => parseCommandHeader("% ")).toThrowError(/Invalid first line/);
});
