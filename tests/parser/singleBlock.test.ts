import TextParser from "@App/parsers/TextParser";
import * as script from "@App/parsers/script";

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
    const sb = parser.scriptBuilder;
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
    const sb = parser.scriptBuilder;
    const robotBlock = sb.getBlock("robot");

    expect(robotBlock.transitions.length).toBe(1);

    const trans = robotBlock.transitions[0];
    expect(trans.targetType).toBe("end");
  });
});

describe("a multi block script", () => {
  const text = `
    % block name="robot"

    beep boop

    % block name="human"

    i am human
  `;
  const parser: TextParser = new TextParser(text);
  const sb = parser.scriptBuilder;

  it("parses into 2 commands", () => {
    expect(parser.commands.length).toBe(2);

    const secondCommand = parser.commands[1];
    expect(secondCommand.type).toBe("block");
    expect(secondCommand.params["name"]).toBe("human");
  });

  it("has two blocks", () => {
    expect(sb.getBlock("robot").name).toBe("robot");
    expect(sb.getBlock("robot").data).not.toMatch(/i am human/);

    expect(sb.getBlock("human").name).toBe("human");
  });

  it("transitions from robot to human to end", () => {
    const robot = sb.getBlock("robot");
    expect(robot.transitions[0].targetName).toBe("human");

    const human = sb.getBlock("human");
    expect(human.transitions[0].targetName).toBe("end");
  });
});
