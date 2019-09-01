import Script from "@App/script/Script";

describe("given an empty script", () => {
  const text = `
    // human nonsense here
  `;

  const parser: Script = new Script(text);

  it("has no commands", () => {
    expect(parser.commands.length).toBe(0);
  });

  it("is not valid", () => {
    const script = parser.engine;
    expect(script).not.toBeAValidScript();
    expect(script).toMatchScriptError(/NoBlocksFound/);
  });
});
