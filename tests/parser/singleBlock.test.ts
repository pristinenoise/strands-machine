import TextParser from "@App/parsers/TextParser";

test("a simple script parses", () => {
  const rawScript = `
    % block: robot

    beep boop
  `;
  const parser: TextParser = new TextParser(rawScript);

  expect(parser.scriptBuilder.getBlock("robot")).toMatch(/beep boop/);
});
