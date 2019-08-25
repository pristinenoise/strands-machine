import Script from "@App/Script";
import TextParser from "@App/parsers/TextParser";

test("a simple script parses", () => {
  const rawScript = `beep boop`;
  const parser: TextParser = new TextParser(rawScript);
  const script: Script = parser.getScript();

  expect(script.getStartingBlock()).toBe("xxx");
});
