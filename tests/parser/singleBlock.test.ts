import TextParser from "@App/parsers/TextParser";

test("a simple script parses into commands", () => {
  const rawScript = `
    % block name="robot"

    beep boop
  `;
  const parser: TextParser = new TextParser(rawScript);
  expect(parser.commands.length).toBe(1);

  const firstCommand = parser.commands[0];
  expect(firstCommand.type).toBe("block");
  expect(firstCommand.params["name"]).toBe("robot");
  expect(firstCommand.data).toMatch(/beep boop/);
});

test("comments are ignored", () => {
  const rawScript = `
    % block name="robot"
    // human nonsense here
    beep boop
  `;
  const firstCommand = new TextParser(rawScript).commands[0];
  expect(firstCommand.data).not.toMatch(/human nonsense/);
});

test("a multi block script parses into commands", () => {
  const rawScript = `
    % block name="robot"

    beep boop

    % block name="human"

    i am human
  `;
  const parser: TextParser = new TextParser(rawScript);
  expect(parser.commands.length).toBe(2);

  const secondCommand = parser.commands[1];
  expect(secondCommand.type).toBe("block");
  expect(secondCommand.params["name"]).toBe("human");
});
