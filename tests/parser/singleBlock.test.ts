import TextParser from "@App/parsers/TextParser";
import * as script from "@App/script/script";

describe("given a one block script", () => {
  const text = `
    % block name="robot"

    // human nonsense here
    beep boop
  `;

  const parser: TextParser = new TextParser(text);

  it("parses into a single block command", () => {
    expect(parser.commands.length).toBe(1);

    const firstCommand = parser.commands[0];
    expect(firstCommand.type).toBe("block");
    expect(firstCommand.params["name"]).toBe("robot");
    expect(firstCommand.data).toMatch(/beep boop/);
  });

  describe("the first block", () => {
    const sb = parser.script;
    const robotBlock = sb.getBlock("robot");

    it("parses correctly", () => {
      expect(robotBlock).not.toBeNull();
      expect(robotBlock.name).toBe("robot");
      expect(robotBlock.data).toMatch(/beep boop/);
    });

    it("does not parse comments", () => {
      expect(robotBlock.data).not.toMatch(/human nonsense/); // ignores comments
    });
  });

  it("adds a default transition to the end", () => {
    const sb = parser.script;
    const robotBlock = sb.getBlock("robot");

    expect(robotBlock.transitions.length).toBe(1);

    const trans = robotBlock.transitions[0];
    expect(trans.targetType).toBe("end");
  });
});
