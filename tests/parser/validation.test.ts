import TextParser from "@App/parsers/TextParser";
import Script from "@App/script/Script";
import * as script from "@App/script/script.d";

expect.extend({
  toBeAValidScript(received: Script) {
    const response: script.ValidationResponse = received.checkValidity();
    const errorMessages = response.errors.map((err: script.ValidationError) => {
      `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      return {
        message: (): string => `expected script to have no errors, but had ${
          errorMessages.length
        } errors: 
          ${errorMessages.join("\n")} 
        `,
        pass: false,
      };
    }
  },
  toMatchScriptError(received: Script, pattern: RegExp) {
    const response: script.ValidationResponse = received.checkValidity();
    const errorMessages = response.errors.map((err: script.ValidationError) => {
      return `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      const matchingErrors = errorMessages.filter((msg: string) =>
        pattern.test(msg)
      );

      if (matchingErrors.length >= 0) {
        return {
          message: (): string => `
            expected script to have no errors matching ${pattern}, but found matching errors:
            ${matchingErrors.join("\n")}
          `,
          pass: true,
        };
      } else {
        return {
          message: (): string => `
            expected script to have errors matching ${pattern}, but no matches were found:
            ${errorMessages.join("\n")}
          `,
          pass: false,
        };
      }
    }
  },
});

describe("given an empty script", () => {
  const text = `
    // human nonsense here
  `;

  const parser: TextParser = new TextParser(text);

  it("has no commands", () => {
    expect(parser.commands.length).toBe(0);
  });

  it("is not valid", () => {
    const script = parser.script;
    expect(script).not.toBeAValidScript();
    expect(script).toMatchScriptError(/NoBlocksFound/);
  });
});
