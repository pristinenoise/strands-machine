import TextParser from "@App/parsers/TextParser";
import * as script from "@App/script/script";

describe("a multi block script", () => {
  const text = `
    % block name="robot"

    beep boop

    % block name="human"

    i am human
  `;
  const parser: TextParser = new TextParser(text);
  const sb = parser.script;

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

  it("wires up the robot to the next block", () => {
    const robot = sb.getBlock("robot");
    expect(robot.transitions[0].targetType).toBe("block");
    expect(robot.transitions[0].targetName).toBe("human");
  });

  it("wiere up the last block to the end transition", () => {
    const human = sb.getBlock("human");
    expect(human.transitions[0].targetType).toBe("end");
  });
});
