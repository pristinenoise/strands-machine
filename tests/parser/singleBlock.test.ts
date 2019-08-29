import TextParser from "@App/parsers/TextParser";

test("a simple script parses", () => {
  const rawScript = `
    % block name="robot"

    beep boop
  `;
  const parser: TextParser = new TextParser(rawScript);
  expect(parser.commands.length).toBe(1);

  const firstCommand = parser.commands[0];
  expect(firstCommand.type).toBe("block");
  expect(firstCommand.params["name"]).toBe("robot");
});
